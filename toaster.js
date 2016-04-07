(function() {
    'use strict';
    global['toaster'] = {};
    var app = require('express')(),
        server = require('http').createServer(app),
        jwt = require('jsonwebtoken'),
        request = require('request'),
        fs = require('fs'),
        moment = require('moment'),
        mongo = require('mongodb'),
        mongoose = require('mongoose'),
        Promise = require('bluebird'),
        bodyParser = require('body-parser');
    global['ioServer'] = require('socket.io')(server);
    mongoose.connect('mongodb://localhost:27017/toaste');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    toaster.orm = mongoose;
    toaster.local = require(__dirname + '/config/locals.js');
    app.use(bodyParser.urlencoded({
        extended: false
    }))

    // parse application/json
    app.use(bodyParser.json())

    function getFiles(dir, files_) {
        files_ = files_ || [];
        var files = fs.readdirSync(dir);
        for (var i in files) {
            var name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                getFiles(name, files_);
            } else {
                files_.push(name);
            }
        }
        return files_;
    }

    ['/models', '/controllers'].map(function(pattern) {
            getFiles(__dirname + pattern).map(function(item) {
                var name = item.split('/').pop();
                global[name.slice(0, -3)] = require(item);
            })
        })
    // setting router
    toaster.route = require(__dirname + '/config/router.js');
    var auth = require(__dirname + '/config/auth.js');
    Object.keys(toaster.route).map(function(value, index) {
        var endpoint = toaster.route[value];
        Object.keys(endpoint).map(function(action, fn) {
            app[action](value, function(req,res){
                auth(req,res,endpoint[action][0],endpoint[action][1] || 'user')  
            });
        })
    });
    // setting events
    toaster.events = {}
    toaster.enligne = []

    toaster.enligneUser = function(id) {
        for (var i in toaster.enligne) {
            if (toaster.enligne[i].id == id) return toaster.enligne[i];
        }
        return null
    }
    getFiles(__dirname + '/events').map(function(item) {
        var name = item.split('/').pop();
        toaster.events[name.slice(0, -3)] = require(item);
    })
    ioServer.on('connection', function(soket) {
        Object.keys(toaster.events).map(function(value, index) {
            var events = toaster.events[value];
            Object.keys(events).map(function(evt, index) {
                soket.on(evt, function() {
                    var newarg = [].slice.call(arguments, 0)
                    newarg.push(soket)
                    events[evt].apply(null, newarg);
                });
            })
        })
        soket.on('disconnect', function() {
            if (toaster.enligne[soket.enligneIndex] && toaster.enligne[soket.enligneIndex].id == soket.user_id) {
                toaster.enligne.splice(soket.enligneIndex, 1);
            }
        })
    });

    var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 5015;

    server.listen(port);
    console.log('Server running on port %d', port);
})();
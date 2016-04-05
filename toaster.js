(function() {
    'use strict';

    var app = require('express')(),
        server = require('http').createServer(app),
        ioServer = require('socket.io')(server),
        jwt = require('jsonwebtoken'),
        request = require('request'),
        fs = require('fs'),
        moment = require('moment'),
        mongo = require('mongodb'),
        mongoose = require('mongoose'),
        Promise = require('bluebird'),
        bodyParser = require('body-parser');

    var keyToken = '$2a$10$qmUSjf4A7NeYQ8VEQbDwNe';

    mongoose.connect('mongodb://localhost:27017/toaste');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // we're connected!
    });

    var notification = mongoose.model('toast', mongoose.Schema({
        toast: Object,
        vu: Boolean,
        user: Number,
        type: { type: String, trim: true },
        created_at: { type: Date } 
    }));


    var first_notife = new notification({
        toast: {
            img: '',
            msg: 'test toaste',
            type: 'notif',
            links: ['#']
        },
        vu: false,
        user: 9,
        type: 'notife'
    })
    first_notife.save(function(err, note) {
        if (err) return console.error(err);
    });


    notification.find({
        user: 9
    }, function(err, totifes) {
        console.log(totifes);
    })
    app.use(bodyParser.urlencoded({
        extended: false
    }))

    // parse application/json
    app.use(bodyParser.json())

    ioServer.on('connection', function(soket) {
        soket.on('login', function(token) {
            jwt.verify(token.token, keyToken, function(err, decoded) {
                if (err) {

                }else{
                    if (decoded.action === 'accessToken') {
                        var user = decoded.id;
                        console.log(user)
                    }
                }
            });
            
            soket.emit('push', {
                img: '',
                msg: 'test toaste',
                type: 'notif',
                links: ['#']
            })
        })
    });

    var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 5015;

    server.listen(port);
    console.log('Server running on port %d', port);
})();
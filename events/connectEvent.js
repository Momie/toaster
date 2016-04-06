jwt = require('jsonwebtoken')

var connectEvent = {
    login: function(token, client) {
        jwt.verify(token.token, toaster.local.keyToken, function(err, decoded) {
            if (err) {

            } else {
                if (decoded.action === 'accessToken') {
                    var user = decoded.id;
                    client.user_id = user;
                    client.enligneIndex = toaster.enligne.length;
                    toaster.enligne.push({
                        id: user,
                        socket: client
                    })
                    private_toast.find({
                        user: user,
                        vue : false
                    }, function(err, totifes) {
                    	client.emit('init',totifes)
                    })
                    /*toaster.enligne.map(function(e) {
                        if (e.id != user) e.socket.emit('push', {
                            img: '',
                            msg: 'new user',
                            type: 'notif',
                            links: ['#']
                        })
                    })*/
                }
            }
        });
    },
    create: function() {

    }
};
module.exports = connectEvent;
jwt = require('jsonwebtoken')
var connectEvent = {
    login: function(token, client) {
        jwt.verify(token.token, toaster.local.keyToken, function(err, decoded) {
            if (err) {

            } else {
                if (decoded.action === 'accessToken') {
                    var user = decoded.id;
                    var flag = false;
                    client.user_id = user;
                    for (var i in toaster.enligne) {
                        if (toaster.enligne[i].id == user) {
                            toaster.enligne[i].socket = client
                            flag = true;
                        }
                    }
                    if (!flag) {
                        client.enligneIndex = toaster.enligne.length;
                        toaster.enligne.push({
                            id: user,
                            socket: client
                        })
                    }
                    private_toast.find({
                        user: user,
                        vu: false,
                        opened : false
                    }).sort({
                        createdAt: 1
                    }).exec(function(err, totifes) {
                        if (!err) {
                            var nb = 20 - totifes.length;
                            if (nb > 0) {
                                private_toast.find({
                                    user: user,
                                    vu: true,
                                    opened : false
                                }).limit(nb).sort({
                                    createdAt: 1
                                }).exec(function(err, result) {
                                    client.emit('init', totifes.concat(result))
                                })
                            } else {
                                client.emit('init', totifes)
                            }
                        } else {
                            console.log(err)
                        }
                    });
                }
            }
        });
    },
    create: function() {

    }
};
module.exports = connectEvent;
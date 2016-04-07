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
                        vu: false
                    }, function(err, totifes) {
                        if (!err) {
                            client.emit('init', totifes)
                        } else {
                            console.log(err)
                        }
                    })
                }
            }
        });
    },
    create: function() {

    }
};
module.exports = connectEvent;
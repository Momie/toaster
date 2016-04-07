module.exports = {
    index: function(req, res) {
        private_toast.find({
            user: req.session.user
        }, function(err, totifes) {
        	res.send(totifes)
        })
    },
    public: function(req, res) {
        // disable by bassem 
        /* new public_toast({
            toast: JSON.parse(req.body.toast)
        }).save(function(err, note) {
            if (!err) {
                ioServer.emit('push', JSON.parse(req.body.toast))
                res.send('ok')
            }
        }); 
		*/
    },
    private: function(req, res) {
    	console.log(typeof req.body.toast, req.body.toast)
        new private_toast({
            toast: req.body.toast,
            vu: false,
            user: Number(req.params.id),
            type: req.body.type
        }).save(function(err, note) {
            if (!err) {
                var user = toaster.enligneUser(Number(req.params.id))
                if (user) {
                    user.socket.emit('push', req.body.toast)
                }
                return res.send('ok')
            }
        })
    }
};
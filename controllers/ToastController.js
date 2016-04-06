module.exports = {
    index: function(req, res) {
        ioServer.emit('push', {
            img: '',
            msg: 'from end point' + req.params,
            type: 'notif',
            links: ['#']
        })
        res.send('ok')
    },
    public: function(req, res) {
        var public_notife = new public_toast({
            toast: req.body.toast
        })
        public_notife.save(function(err, note) {
            if (err) return console.error(err);
        });
        res.send('ok')
    },
    private: function(req, res) {
        var private_notife = new private_toast({
            toast: req.body.toast,
            vu: false,
            user: req.params.id,
            type: req.body.type
        })
        res.send('ok')
    }
};
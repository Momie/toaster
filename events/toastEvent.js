var toastEvent = {
    vu: function(ids, client) {
        private_toast.update({
            user: client.user_id,
            _id: {
                $in: ids
            }
        }, {
            vu: true
        }, {multi: true}, function(err, totifes) {
            console.log(totifes);
        })
    }
};
module.exports = toastEvent;
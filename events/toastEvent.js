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
        	if(err){
        		console.log(err);
        	}else{
        		client.emit('update',totifes);
        	}
        })
    },
    open: function(ids, client) {
        private_toast.update({
            user: client.user_id,
            _id: {
                $in: ids
            }
        }, {
            opened: true
        }, {multi: true}, function(err, totifes) {
        	if(err){
        		console.log(err);
        	}else{
        		client.emit('update',totifes);
        	}
        })
    }
};
module.exports = toastEvent;
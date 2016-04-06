var toastEvent = {
    vu: function(id,client){
    	private_toast.find({
            user: client.user_id,
            id: id
        }, function(err, totife) {
            console.log(totife);
        })
    }  
};
module.exports = toastEvent;
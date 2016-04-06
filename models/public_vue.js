
var notification = toaster.orm.model('publicvue', toaster.orm.Schema({
    toast: Object,
    vu: Boolean,
    created_at: {
        type: Date
    }
}));

module.exports = notification;
var notification = toaster.orm.model('publicToast', toaster.orm.Schema({
    toast: Object,
    vu: Array
},{
    timestamps: true
}));

module.exports = notification;
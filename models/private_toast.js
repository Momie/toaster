
var notification = toaster.orm.model('privateToast', toaster.orm.Schema({
    toast: Object,
    vu: Boolean,
    user: Number,
    type: { type: String, trim: true }
},{
    timestamps: true
}));

module.exports = notification;
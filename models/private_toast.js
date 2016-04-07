var notification = toaster.orm.model('privateToast', toaster.orm.Schema({
    toast: Object,
    vu: {
        type: Boolean,
        default: false
    },
    opened: {
        type: Boolean,
        default: false
    },
    user: {
        type: Number,
        required: true,
        min: 1
    },
    type: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true
}));

module.exports = notification;

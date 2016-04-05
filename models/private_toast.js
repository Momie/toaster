    var notification = mongoose.model('privateToast', mongoose.Schema({
        toast: Object,
        vu: Boolean,
        user: Number,
        type: { type: String, trim: true },
        created_at: { type: Date } 
    }));
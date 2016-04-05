    var notification = mongoose.model('publicToast', mongoose.Schema({
        toast: Object,
        vu: Boolean,
        created_at: { type: Date } 
    }));
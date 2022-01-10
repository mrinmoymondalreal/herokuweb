const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    strs: { type: Object },
    linktree: { type: Object },
    user_id: { type: String, requried: true, unique: true, index: true },
},{ collection: 'short_urls_data' }
);

UserSchema.index({ user_id: 1 });

const strmodel = mongoose.model('ShortDataUrlModel', UserSchema);

module.exports = strmodel;
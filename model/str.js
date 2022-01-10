const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    str: { type: String, requried: true, unique: true, index: true },
    main_url: { type: String, requried: true, unique: false },
    user_id: { type: String, requried: true },
    str_size: { type: Number, requried: true },
    isAppOpener: { type: Boolean, required: true },
    url_title: { type: String },
    package_name: { type: String }
},{ collection: 'short_urls' }
);

UserSchema.index({ str: 1 });

const strmodel = mongoose.model('UrlModel', UserSchema);

module.exports = strmodel;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {type: String, requried: true, unique: true, index: true },
    email: {type: String, requried: true, unique: true },
    password: {type: String, requried: true},
    name: {type: String, requried: true},
    mob: {type: String, requried: true}
},{ collection: 'users' }
);

UserSchema.index({ username: 1 });

const model = mongoose.model('UserModel', UserSchema);

module.exports = model;

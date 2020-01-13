let mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    sessionID: String,
    username: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema);
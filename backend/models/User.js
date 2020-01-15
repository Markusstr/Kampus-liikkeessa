let mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    sessionID: String,
    email: String,
    name: String,
    password: String,
    studentNum: String,
    address: String
});

module.exports = mongoose.model('User', UserSchema);
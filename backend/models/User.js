let mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    sessionID: String,
    username: String,
    name: String,
    password: String,
    studentNum: String,
    phoneNum: String
});

module.exports = mongoose.model('User', UserSchema);
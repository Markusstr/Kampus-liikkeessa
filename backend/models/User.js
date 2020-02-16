let mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    sessionID: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        distinct: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    studentNum: {
        type: String,
        required: true,
    },
    address: String
});

module.exports = mongoose.model('User', UserSchema);
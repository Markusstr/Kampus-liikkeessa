let mongoose = require('mongoose');

let LocationSchema = mongoose.Schema({
    name: String,
    address: String
});

module.exports = mongoose.model('Location', LocationSchema);
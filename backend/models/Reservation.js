let mongoose = require('mongoose');

let ReservationSchema = mongoose.Schema({
    username: String,
    date: Date,
    length: String
})

module.exports = mongoose.model('Reservation', ReservationSchema);
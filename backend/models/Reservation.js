let mongoose = require('mongoose');

let ReservationSchema = mongoose.Schema({
    name: String,
    start: Date,
    end: Date,
    location: String,
    info: String
});

module.exports = mongoose.model('Reservation', ReservationSchema);
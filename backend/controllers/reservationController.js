let Reservation = require('../models/Reservation');

exports.getReservations = async (req, res) => {
    try {

    }
    catch (err) {
        res.status(404).json({error: err});
    }
}

exports.saveReservation = async (req, res) => {
    const reservation = new Reservation({
        username: req.body.username,
        date = req.body.date,
        length = req.body.length
    });

    try {
        const savedReservation = await reservation.save();
        res.status(200).json(savedReservation);
    }
    catch (err) {
        res.status(404).json({error: err});
    }
}


let Reservation = require('../models/Reservation');

exports.getReservations = async (req, res) => {
    try {
        const reservation = await Reservation.find({location: req.body.location});
        res.status(200).json(reservation);
    }
    catch (err) {
        res.status(404).json({error: err});
    }
}

exports.removeReservation = async (req, res) => {
    try {
        const reservation = await Reservation.deleteOne({_id: req.body.id});
        res.status(200).json(post);
    }
    catch (err) {
        res.status(404).json({error: err});
    }
}

exports.saveReservation = async (req, res) => {
    const reservation = new Reservation({
        name: req.body.name,
        start: req.body.start,
        end: req.body.end,
        location: req.body.location,
        info: req.body.info
    });
    
    try {
        const savedReservation = await reservation.save();
        res.status(200).json(savedReservation);
    }
    catch (err) {
        res.status(404).json({error: err});
    }
}


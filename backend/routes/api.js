let express = require('express'),
    router = express.Router();

    let reservationController = require('../controllers/reservationController');

    router.post('/getReservations', (req, res) => {
        reservationController.getReservations(req, res);
    });

    router.post('/saveReservation', (req, res) => {
        reservationController.saveReservation(req, res);
    });
    


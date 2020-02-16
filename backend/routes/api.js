let express = require('express'),
    router = express.Router();

    let reservationController = require('../controllers/reservationController');
    let userController = require('../controllers/userController');
    let locationController = require('../controllers/locationController');

    router.post('/getReservations', (req, res) => {
        reservationController.getReservations(req, res);
    });


    router.post('/getReservationsByUser', (req, res) => {
        reservationController.getReservationsByUser(req, res);
    });

    router.post('/removeReservation', (req, res) => {
        reservationController.removeReservation(req, res);
    });
    
    router.post('/saveReservation', (req, res) => {
        reservationController.saveReservation(req, res);
    });

    router.post('/modifyReservation', (req, res) => {
        reservationController.modifyReservation(req, res);
    });
    // Authentication routes:
    router.post('/login', (req, res) => {
        userController.checkUsername(req, res);
    });
    router.post('/logout', (req, res) => {
        userController.updateID(req, res);
    });

    router.post('/sessionlogin', (req, res) => {
        userController.checkSessionid(req, res);
    });

    router.post('/saveUser', (req, res) => {
        userController.saveUser(req, res);
    });
    
    router.post('/isEmail', (req, res) => {
        userController.isEmail(req, res);
    });


    router.post('/loadUserByID', (req, res) => {
        userController.loadUserByID(req, res);
    });

    router.post('/checkUser', (req, res) => {
        userController.checkUser(req, res);
    });

    router.get('/getLocations', (req, res) => {
        locationController.getLocations(req, res);
    });

    router.post('/saveLocation', (req, res) => {
        locationController.saveLocation(req, res);
    });

    module.exports = router;
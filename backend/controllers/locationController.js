let Location = require('../models/Location');

exports.getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    }
    catch (err) {
        res.status(404).json({error: err});
    }
}

exports.saveLocation = async (req, res) => {

    console.log(req.body.name + ":" + req.body.address);
    const location = new Location({
        name: req.body.name,
        date: req.body.address
    });

    console.log(location);

    try {
        const savedLocation = await location.save();
        res.status(200).json(savedLocation);
    }
    catch (err) {
        res.status(404).json({error: err});
    }
}
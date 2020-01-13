let User = require("../models/User");

exports.checkUsername = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        res.status(200).json(user);
    }
    catch (err) {
        res.status(404).json({error: err});
    }
}

exports.checkUser = async (req, res) => {
    try {
        const user = await User.find({username: req.body.username, password: req.body.password});
        res.status(200).json(user);
    }
    catch (err) {
        res.status(404).json({error: err});
    }
}

exports.loadUserByID = async (req, res) => {
    try {
        const user = await User.findOne({sessionID: req.body.sessionID});
        res.status(200).json(user);
    }
    catch (err) {
        res.status(404).json({error: err});
    }
}

exports.updateID = (req, res) => {
    User.findOneAndUpdate({username: req.body.username}, {sessionID: req.body.sessionID}, err => {
        if (err) {
            return res.send(500, {error : err});
        }
        return res.status(200).json({message: "Onnistui!"});
    });
};

exports.saveUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        sessionID: req.body.sessionID
    });

    try {
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    }
    catch (err) {
        res.status(404).json({error: err});
    }
};
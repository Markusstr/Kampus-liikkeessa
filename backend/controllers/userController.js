let User = require("../models/User");
const crypto = require('crypto');

exports.checkUsername = async (req, res, auth) => {
    console.log("Searching user "+ req.body.username);
    let responseValue = false;

    try {
        const user = await User.findOne({name: req.body.username});
        if (user === null) {
            console.log("failed at finding user");
            responseValue = false;
        }
        else {
            const passOk = req.body.password.localeCompare(user.password);
            console.log(req.body.password);
            if (passOk === 0) {
                responseValue = true;
            }
            else {
                console.log("failed at securing password");
            }
        }
        res.status(200).json(responseValue);
    }
    
    catch (err) {
        console.log(err);
        res.status(404).json({error: err});
    }
}

exports.checkUser = async (req, res) => {
    try {
        console.log("Searching user "+ req.body.username);
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
    console.log(req.body.sessionID);

    const user = new User({

        sessionID: req.body.sessionID,
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        studentNum: req.body.studentNum,
    });
    console.log(user);

    try {
        const savedUser = await user.save();
        res.status(200).json("success");
    }
    catch (err) {
        res.status(404).json({error: err});
    }
};
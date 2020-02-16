let User = require("../models/User");
const crypto = require('crypto');

exports.checkUsername = async (req, res) => {
    console.log("Searching user "+ req.body.name);
    let responseValue = false;

    try {
        const user = await User.findOne({name: req.body.name});
        if (user !== null) {
            const passOk = req.body.password.localeCompare(user.password);
            console.log("This password from user: " + user.password);
            console.log(req.body.password);
            if (passOk === 0) {
                console.log("Updating this session: " + req.body.sessionID + " to user " + user.name);
                await updateIdClear(user.name, req.body.sessionID)
                responseValue = true;
            }
            else {
                console.log("failed at securing password");
            }
        }
        else {
            console.log("failed at finding user");
            responseValue = false;
        }
        res.status(200).json(responseValue);
    }
    
    catch (err) {
        console.log(err);
        res.status(404).json({error: err});
    }
}

exports.checkSessionid = async (req, res) =>  {
    let response = false;
    try {
        console.log("Searching sessionid: "+ req.body.sessionID);
        const user = await User.findOne({sessionID: req.body.sessionID});
        console.log(user);
        console.log(user.name);
        console.log(user.email);
        if (user !== null) {
            response = {
                responseValue: true,
                username: user.name,
            };
        }
        else {
            response = {
                responseValue: false,
            };
        }
        console.log(response);
        res.status(200).json(response);
    }
    catch (err) {
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

exports.updateID = async (req, res) => {
    let responseValue = false;
    let user;
    console.log("Trying to log out: " + req.body.name);
    try {
        user = await User.findOne({name: req.body.name});
        console.log(user);
        if (user !== null) {
            console.log(req.body.sessionID)
            const sessOk = (req.body.sessionID).localeCompare(user.sessionID);
            // console.log(req.body.password);
            if (sessOk === 0) {
                console.log("Logging out user " + user.name + "Setting newSessid to: " + req.body.newSessId);
                await updateIdClear(user.name, req.body.newSessId);
                responseValue = true;

            }
            else {
                console.log("failed at securing sessid");
                responseValue = false;
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    
    res.status(200).json(responseValue);
};

exports.isEmail = async (req, res) => {
    console.log("finding email: " + req.body.email);
    const user = await User.findOne({email: req.body.email});
    if (user !== null) {
        console.log("Found user: " + user.name);
        res.status(200).json(true);

    }
    else {
        console.log("No such user with email: " + req.body.email);
        res.status(200).json(false);
    }
}

const updateIdClear = async (username, sessid) => {
    console.log("Logging in or out as: ", username);
    try {
        console.log("Trying to update sessid:" + sessid);
        await User.updateOne({name: username}, {sessionID: sessid}, err => {
            console.log(err);
        });
        console.log("Update done!");
    }
    catch (err) {
        console.log(err);
    }
    
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
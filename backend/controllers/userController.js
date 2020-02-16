let User = require("../models/User");

exports.checkUser = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username, password: req.body.password});
        if (user === null) {
            res.status(200).json(false);
        }
        else {
            res.status(200).json(true);
        }
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
        studentNum: req.body.studentNum,
        phoneNum: req.body.phoneNum
    });

    try {
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    }
    catch (err) {
        res.status(404).json({error: err});
    }
};

exports.modifyUser = async (req, res) => {
    try {
        /*const user = await User.findByIdAndUpdate({_id: req.body.id}, {
            name: req.body.name,
            start: req.body.start,
            end: req.body.end,
            location: req.body.location,
            info: req.body.info
        });*/
        const user = await User.findOneAndUpdate({username: req.body.username}, {
            username: req.body.username,
            password: req.body.password,
            studentNum: req.body.studentNum,
            phoneNum: req.body.phoneNum
        });
        res.status(200).json(true);
    }
    catch (err) {
        res.status(404).json({error: err});
    }
}

exports.loadUser = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        res.status(200).json(user);
    }
    catch (err) {
        res.status(404).json({error: err});
    }
}
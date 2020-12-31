const bcrypt = require('bcrypt');
const User = require('../models/user');
const saltRounds = 10;

exports.register = (req, res) => {

    const { username, password } = req.body

    User.findOne({ username: username }, function (err, user) {
        if (err) {
            res.json({
                message: 'Something Bad Happened'
            })
        }
        if (user) {
            res.json({
                message: 'User Already Registered'
            })
        }
        if (!user) {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    const user = new User({
                        username: username,
                        password: hash
                    })
                    user.save(function (err, result) {
                        if (err) {
                            res.json({
                                message: 'You are not able to register. Please try again.'
                            })
                        }
                        else {
                            User.find({}, function (error, users) {
                                if (error) {
                                    res.json({
                                        message: 'Some error occured'
                                    })
                                }
                                if (!users) {
                                    res.json({
                                        message: 'You entered incorrect Username and Password.'
                                    })
                                }
                                if (users) {
                                    res.json(users);
                                }
                            })
                        }
                    });
                });
            })
        }
    })

}

exports.login = (req, res) => {

    const { username, password } = req.body

    User.findOne({ username: username }, function (err, user) {
        if (err) {
            res.json({
                message: 'Some error occured'
            })
        }
        if (!user) {
            res.json({
                message: 'You entered incorrect Username and Password.'
            })
        }
        if (user) {
            const checkPass = bcrypt.compareSync(password, user.password);
            if (checkPass) {
                res.json(user)
            } else {
                res.json({
                    message: 'You entered incorrect email and password.'
                })
            }
        }
    })
}

exports.getUsers = (req, res) => {

    User.find({}, function (err, users) {
        if (err) {
            res.json({
                message: 'Some error occured'
            })
        }
        if (!users) {
            res.json({
                message: 'You entered incorrect Username and Password.'
            })
        }
        if (users) {
            res.json(users);
        }
    })
}

exports.deleteUser = async (req, res) => {
    const { id } = req.body;

    try {
        User.findByIdAndRemove(id, (err, document) => {
            if (err) {
                res.json({
                    message: "something wrong happened"
                })
            }
            User.find({}, function (err, doc) {
                if (err) {
                    res.json({
                        message: "something wrong happened"
                    })
                }
                if (doc) {
                    res.json(doc)
                }
            })
        });
    } catch (err) {
        res.send("error")
    }
}
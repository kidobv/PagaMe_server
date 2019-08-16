const User = require('../models/user.model');

exports.create = function (req, res) {
    let user = new User(
        {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User Created successfully')
    })
};
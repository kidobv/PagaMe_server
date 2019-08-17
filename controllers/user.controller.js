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

exports.getUserById = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        }
        else if (user) { // if user is not null
            res.send(user);
        }
        else {
            res.send('No Account has been found with the given credential');
        }
    })
};


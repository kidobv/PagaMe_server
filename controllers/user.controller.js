const User = require('../models/user.model');

exports.create = function (req, res) {
    let user = new User(
        {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password
        }
    );

    user.save(function (err, doc) {
        if (err) {
            res.send('error')            
            //send res status would be helpful
            //return next(err);
        }
        res.send(doc)
    })
};

exports.getUserByEmail = function (req, res) {
    User.findOne({email:req.params.email}, function (err, user) {
        if (err) {
            res.send('Unable to find an account');
            //return next(err);
        }
        else if (user) { // if user is not null
            res.send(user);
        }
        else {
            res.send('No Account has been found with the given email');
        }
    })
};

exports.authUser = function (req, res) {
    User.find({ $and: [{ email: req.body.email }, { password: req.body.password }] }, function (err, user) {
        if (err) {
            res.send('Unable to find an account');
            //return next(err);
        }
        else if (user.length > 0) { // if user is not null, pass fullName and email in response    
            res.send({
                fullName: user[0].fullName,
                email: user[0].email
            });
        }
        else {
            res.send('No Account has been found with the given credential');
        }
    });
};



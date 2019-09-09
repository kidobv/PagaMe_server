const User = require('../models/user.model');
// session validation
const session = require('../session.js');

exports.create = function (req, res) {
    let user = new User(
        {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password
        }
    );
    //look how to limit number of request to prevent too many calls from same client/IP    
    user.save(function (err, doc) {
        if (err) {
            res.send('error')            
            //send response http status would be helpful
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
        else if (user) { // if user is not null, pass only email to front end
            res.send({email: user.email});
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
            session.AUTH_EMAIL = user[0].email; 
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

exports.googleAuth = function (req,res) { 
    if (req.body.email)    {
        session.AUTH_EMAIL = req.body.email; 
        res.send('User logged successfully'); 
    }
     else{
        res.send('No email address provided')
     }        
};

exports.logout = function (req,res){
    //reset user
    session.AUTH_EMAIL = '';
    res.send('User logged out successfully');  
};



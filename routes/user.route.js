const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');

//Create User route
router.post('/create', user_controller.create);
router.post('/auth', user_controller.authUser);
router.post('/gauth', user_controller.googleAuth);
//the order of the route matters when you have a parameter like in the case below, 
//if /:email is not last whenever logout route is called the server will interpret "logout" as an email parameter
//look for a better way to define routes for version 1.1
router.get('/logout', user_controller.logout);
router.get('/:email', user_controller.getUserByEmail);


module.exports = router;
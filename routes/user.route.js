const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');

//Create User route
router.post('/create', user_controller.create);
router.post('/find', user_controller.authUser);
router.get('/:email', user_controller.getUserByEmail);

module.exports = router;
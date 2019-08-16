const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');

//Create User route
router.post('/create', user_controller.create);

module.exports = router;
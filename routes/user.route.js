const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');

//Create User route
router.post('/create', user_controller.create);
router.get('/:id', user_controller.getUserById);

module.exports = router;
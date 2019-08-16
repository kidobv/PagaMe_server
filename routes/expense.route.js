const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const expense_controller = require('../controllers/expense.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', expense_controller.test);

//Create Expense route
router.post('/create', expense_controller.create);
router.get('/:id', expense_controller.getExpenseById);
router.put('/:id', expense_controller.updateExpense);
router.delete('/:id/delete', expense_controller.deleteExpense);

module.exports = router;
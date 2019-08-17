const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const expense_controller = require('../controllers/expense.controller');

//Create Expense route
router.post('/create', expense_controller.create);
router.get('/:id', expense_controller.getExpenseById);
router.put('/:id', expense_controller.updateExpense);
router.delete('/:id/delete', expense_controller.deleteExpense);

//Custom routes
router.get('/:userEmail/all', expense_controller.getExpensesHistory);

module.exports = router;
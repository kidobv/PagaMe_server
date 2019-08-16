const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ExpenseSchema = new Schema({
    description: { type: String, required: true, max: 200 },
    amount: { type: Number, required: true },
    requestor: { type: String, required: true },
    requestee: { type: String, required: true },
    date: { type: Date, required: true },
    userId: { type: Number, required: false }
});

// Export the model
module.exports = mongoose.model('Expense', ExpenseSchema);
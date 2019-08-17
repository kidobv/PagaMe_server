const Expense = require('../models/expense.model');

//Create POST method
exports.create = function(req,res){
    let expense = new Expense(
        {
            description: req.body.description,
            amount: req.body.amount,
            requestor: req.body.requestor,
            userId: req.body.userId,
            date: req.body.date, 
            requestee: req.body.requestee
        }
    );
    //save method triggers the middleware, a callback function is optional but is a good place to capture any error and send a simple response
    expense.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Expense Created successfully')
    })
};

//GET 
exports.getExpenseById = function (req, res) {    
    Expense.findById(req.params.id, function (err, expense) {
        if (err) {
            return next(err);
        }
        else if(expense){
            res.send(expense);
        }
        else{
            res.send('No Expense found');
        }
        
    })
};

//PUT
exports.updateExpense = function(req,res){
    Expense.findByIdAndUpdate(req.params.id, { $set: req.body },
         function(err){
            if(err) return next(err);
             res.send('Expense updated successfully');
         });
};

//DELETE
exports.deleteExpense = function (req, res) {
    Expense.findByIdAndDelete(req.params.id,
        function (err, doc) { // findByIdAndDelete passes the deleted document in the callback function we can use an argument like doc to access it
            if (err) return next(err);
            if (doc) res.send(doc)
            else res.send("No record found")
        });
};

//Custom methods
exports.getExpensesHistory = function (req, res) {    
    Expense.find({ $or: [{ requestor: req.params.userEmail }, { requestee: req.params.userEmail }] }, 
        function (err, docs) {
        if (err) {
            return next(err);
        }
        else if (docs) {
            res.send(docs);
        }
        else {
            res.send('No Expenses found');
        } 
    });
};
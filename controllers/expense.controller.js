const Expense = require('../models/expense.model');
// session validation
const session = require('../session.js');

//Create POST method
exports.create = async function(req,res){
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
    await expense.save(function (err,doc) {
        if (err) {
            res.send('Unable to create Expense')
        }
        res.send(doc)
    })
};

//GET 
exports.getExpenseById = function (req, res) {    
    Expense.findById(req.params.id, function (err, expense) {
        if (err) {
            //handling error
            res.send('No Expense found');
            //return next(err);
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
//Not being used yet
// exports.updateExpense = function(req,res){
//     Expense.findByIdAndUpdate(req.params.id, { $set: req.body },
//          function(err){
//             if(err){
//                 res.send("Unable to update Expense object")
//                 //return next(err);
//             } 
//              res.send('Expense updated successfully');
//          });
// };

//DELETE
exports.deleteExpense = function (req, res) {
    Expense.findByIdAndDelete(req.params.id,
        function (err, doc) { // findByIdAndDelete passes the deleted document in the callback function we can use an argument like doc to access it
            if (err) res.send("Unable to delete record or record doesn't exist")//return next(err);
            if (doc) res.send(doc)
            else res.send("No record found")
        });  
};

//Custom methods
exports.getExpensesHistory = function (req, res) {   
    //verify the request is for the authenticated user
    if (req.params.userEmail !== session.AUTH_EMAIL) {
       res.send("Unauthorized Operation!")
        console.log("unathorized " + req.params.userEmail)
        console.log("AUTH_EMAIL " + session.AUTH_EMAIL)
    }else{
        Expense.find({ $or: [{ requestor: req.params.userEmail }, { requestee: req.params.userEmail }] },
            function (err, docs) {
                if (err) {
                    res.send('No Expenses found or bad formatting');//return next(err);
                }
                else if (docs) {
                    res.send(docs);
                }
                else {
                    res.send('No Expenses found');
                }
            });
        }
};
// config variables
const config = require('./config.js');

const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app

const expenseRoute = require('./routes/expense.route'); // Imports routes for the expenses
const userRoute = require('./routes/user.route'); // Imports routes for the users
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true` by default, you need to set it to false.
mongoose.set( 'useFindAndModify', false );
let dev_db_url = config.URL_PRE+config.DB_USER+':'+config.DB_PSW+config.URL_POST;

const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/expenses', expenseRoute); //localhost:3030/expenses/...routres defined in expenseRoute
app.use('/users', userRoute);  //localhost:3030/users/...routres defined in userRoute

let port = 3030;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

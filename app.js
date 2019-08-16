const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app

const expenseRoute = require('./routes/expense.route'); // Imports routes for the expenses
const userRoute = require('./routes/user.route'); // Imports routes for the users
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = '<YOUR_DB_CONNECTION_STRING>';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/expense', expenseRoute);
app.use('/user', userRoute);

let port = 3030;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

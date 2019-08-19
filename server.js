// config variables
const config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app

//allows requests from different domain
var cors = require('cors');
const expenseRoute = require('./routes/expense.route'); // Imports routes for the expenses
const userRoute = require('./routes/user.route'); // Imports routes for the users
const app = express();
app.use(cors());

// Set up mongoose connection
const mongoose = require('mongoose');
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true` by default, you need to set it to false.
mongoose.set( 'useFindAndModify', false );
let dev_db_url = config.URL_PRE+config.DB_USER+':'+config.DB_PSW+config.URL_POST;

const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/expenses', expenseRoute); //localhost:3030/expenses/...routres defined in expenseRoute
app.use('/users', userRoute);  //localhost:3030/users/...routres defined in userRoute


//Error handling
// catch 404 and forward to error handler
app.use(function (err, res) {
    var err = new Error('Not Found');
    err.status = 404;
    res.json('error', {
        message: err.message,
        error: err
    });
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, res) {
        res.status(err.status || 500);
        res.json('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, res) {
    res.status(err.status || 500);
    res.json('error', {
        message: err.message,
        error: {}
    });
});

// //While in development
// app.use(function (res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
//     next();
// });

var server = app.listen(process.env.PORT || 3030, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("App listening at host=%s port=%s", host, port);
});

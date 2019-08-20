
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// config variables
const config = require('./config.js');
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


const allowedExt = ['.js','.ico','.css','.png','.jpg','.woff2','.woff','.ttf','.svg'];

app.get('*',(req,res) =>{
    //resolve for files in the allowedExt array, if non of this extensions are part of the request then serve the index html
    if(allowedExt.filter(ext => req.url.indexOf(ext)>0).length>0){
        res.sendFile(path.resolve(`${__dirname}`,`./view/public/${req.url}`))
    }else{
        res.sendFile(path.resolve(`${__dirname}`, './view/public/index.html'))
    }
});

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("App listening at host=%s port=%s", host, port);
});

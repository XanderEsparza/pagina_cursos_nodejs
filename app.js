var express = require('express');
var path = require('path');
var routes = require("./routes/routes")
const cookieParser = require('cookie-parser');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.use(routes);


module.exports = app;
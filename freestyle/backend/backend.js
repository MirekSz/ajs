'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors');
let fs = require('fs');
var users = require('./users')
var phones = require('./imgSelector').router;

app.listen(3100, function() {
    console.log('listening on 3100');
});

app.use(bodyParser.json({
    type: '*/*'
}));
app.use(cors());
app.use(function(req, res, next) {
    res.header('Cache-Control', 'no-cache');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Content-Type', 'application/json');
    next();
});
app.use('/users', users);
app.use('/phones', phones);
// var selectImages = require('./imgSelector')(app);

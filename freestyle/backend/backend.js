'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors');
let fs = require('fs');

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
var selectImages = require('./imgSelector')(app);
require('./users')(app, selectImages);

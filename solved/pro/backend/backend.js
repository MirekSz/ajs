'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors');
let fs = require('fs');
let path = require('path');
var users = require('./users')
var phones = require('./imgSelector').router;
var swaggerJSDoc = require('swagger-jsdoc');

app.listen(3100, function() {
    console.log('listening on 3100');
});

app.use(express.static(path.join(__dirname, 'public')));
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

// swagger definition
var swaggerDefinition = {
    info: {
        title: 'Users API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:3100',
    basePath: '/',
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js','./users.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

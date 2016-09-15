'use strict';

var router = require('express').Router();
var selectImages = require('./imgSelector').selectImages;
class User {
    constructor(id, fName, lName, age, sex) {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
        this.age = age;
        this.sex = sex;
    }
}

let users = [new User(10, 'Jacek', 'Doe', '43', 'Mężczyzna'),
    new User(1, 'Marzanna', 'Uss', '54', 'Kobieta'),
    new User(2, 'Julia', 'Dolej', '22', 'Kobieta')
];

function generateID() {
    let maxID = 0;
    users.map((obj) => {
        if (obj.id > maxID) {
            maxID = obj.id;
        }
    });
    return (maxID + 1);
}

router.get('/', function(request, response) {
    setTimeout(() => {
        response.send(users);
    }, 1000);
});


router.get('/:id', function(request, response) {
    let found = users.findIndex(user => user.id == request.params.id);
    setTimeout(() => {
        var user = users[found];
        if (user) {
            try {
                user.images = selectImages(3);
            } catch (e) {}
        }
        response.send(user);
        console.log('send user ' + request.params.id);
    }, 1000);
});

router.post('/', function(request, response) {
    let user = request.body;
    user.id = generateID();
    users.push(user);
    setTimeout(() => {
        response.send({
            id: user.id
        });
    }, 1000);
});

router.put('/', function(request, response) {
    let editedUser = request.body;
    let found = users.find(user => user.id == editedUser.id);
    if (found) {
        Object.assign(found, editedUser);
    }
    response.end();
});

router.delete('/:id', function(request, response) {
    if (request.params.id == 10) {
        response.status(500).send('cant delete user with id 10');
        return;
    }
    let found = users.findIndex(user => user.id == request.params.id);
    users.splice(found, 1);
    setTimeout(() => {
        response.end();
    }, 1000);
});

module.exports = router

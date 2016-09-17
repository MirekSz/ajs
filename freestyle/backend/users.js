'use strict';
const delay = 1000;
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

let users = [new User(10, 'Jacek', 'Doe', 43, 'Mężczyzna'),
    new User(1, 'Marzanna', 'Uss', 54, 'Kobieta'),
    new User(2, 'Julia', 'Dolej', 22, 'Kobieta')
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
/**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       id:
 *         type: integer
 *       fName:
 *         type: string
 *       lName:
 *         type: string
 *       sex:
 *         type: string
 *       age:
 *         type: integer
 */
/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/', function (request, response) {
    setTimeout(() => {
        response.send(users);
    }, delay);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/:id', function (request, response) {
    let found = users.findIndex(user => user.id == request.params.id);
    setTimeout(() => {
        var user = users[found];
        if (user && !user.images) {
            try {
                user.images = selectImages(3);
            } catch (e) {
            }
        }
        response.send(user);
        console.log('send user ' + request.params.id);
    }, delay);
});

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: puppy
 *         description: Puppy object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', function (request, response) {
    let user = request.body;
    user.id = generateID();
    users.push(user);
    setTimeout(() => {
        response.send({
            id: user.id
        });
    }, delay);
});

/**
 * @swagger
 * /users:
 *   put:
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: puppy
 *         description: Puppy object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.put('/', function (request, response) {
    let editedUser = request.body;
    let found = users.find(user => user.id == editedUser.id);
    if (found) {
        Object.assign(found, editedUser);
    }
    response.send(editedUser);
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Deletes a single puppy
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Puppy's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/:id', function (request, response) {
    if (request.params.id == 10) {
        response.status(500).send('cant delete user with id 10');
        return;
    }
    let found = users.findIndex(user => user.id == request.params.id);
    var toDelete = users[found]
    users.splice(found, 1);


    setTimeout(() => {
        response.send(toDelete);
    }, delay);
});

module.exports = router

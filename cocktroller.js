const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const jsonBodyParser = bodyParser.json();
const createUserInteractor = require('./app/users/createUser/createUserInteractor.js');

const CreateUserInteractor = require('./app/users/createUser/createUserInteractor.js');
const DeleteUserInteractor = require('./app/users/deleteUser/deleteUserInteractor.js');
const GetUsers = require('./app/users/getUsers/getUsersInteractor.js');
const UpdateUserInteractor = require('./app/users/updateUser/updateUserInteractor.js');

router.post('/users/', jsonBodyParser, CreateUserInteractor.createUserInteractor);
router.get('/users/:userID', GetUsers.getUserByIDInteractor);
router.post('/users/search-all', jsonBodyParser, GetUsers.getAllUsersInteractor);
router.post('/users/search-one', jsonBodyParser, GetUsers.getOneUserInteractor);
router.put('/users/:userID', jsonBodyParser, UpdateUserInteractor.updateUserInteractor);
router.delete('/users/:userID', DeleteUserInteractor.deleteUserInteractor);

module.exports = router;
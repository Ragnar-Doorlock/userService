const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const jsonBodyParser = bodyParser.json();

const CreateUserInteractor = require('./users/createUser/createUserInteractor.js');
const DeleteUserInteractor = require('./users/deleteUser/deleteUserInteractor.js');
const GetUsers = require('./users/getUsers/getUsersInteractor.js');
const UpdateUserInteractor = require('./users/updateUser/updateUserInteractor.js');

/* router.post('/users/', jsonBodyParser, CreateUserInteractor.createUserInteractor);
router.get('/users/:userID', GetUsers.getUserByIDInteractor);
router.post('/users/search-all', jsonBodyParser, GetUsers.getAllUsersInteractor);
router.post('/users/search-one', jsonBodyParser, GetUsers.getOneUserInteractor);
router.put('/users/:userID', jsonBodyParser, UpdateUserInteractor.updateUserInteractor);
router.delete('/users/:userID', DeleteUserInteractor.deleteUserInteractor);

module.exports = router; */

class UsersRouterBuilder {
    async createRoutes () {
        router.post('/users/', jsonBodyParser, CreateUserInteractor.createUserInteractor);
        router.get('/users/:userID', GetUsers.getUserByIDInteractor);
        router.post('/users/search-all', jsonBodyParser, GetUsers.getAllUsersInteractor);
        router.post('/users/search-one', jsonBodyParser, GetUsers.getOneUserInteractor);
        router.put('/users/:userID', jsonBodyParser, UpdateUserInteractor.updateUserInteractor);
        router.delete('/users/:userID', DeleteUserInteractor.deleteUserInteractor);

        return router;
    }
}

module.exports = UsersRouterBuilder;
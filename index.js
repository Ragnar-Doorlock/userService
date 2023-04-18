const fs = require('node:fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const JsonOperations = require('./db/JSONOperations.js');
const CacheProvider = require('./app/cacheProvider/cacheProvider.js');
const UserService = require('./app/users/userService.js');
const UsersController = require('./cocktroller.js');
const routes = require('./cocktroller.js');

const router = express.Router();
const CreateUserInteractor = require('./app/users/createUser/createUserInteractor.js');
const DeleteUserInteractor = require('./app/users/deleteUser/deleteUserInteractor.js');
const GetUsers = require('./app/users/getUsers/getUsersInteractor.js');
const UpdateUserInteractor = require('./app/users/updateUser/updateUserInteractor.js');

(async () => {
    /* const JSON_PATH = './db/db.json';
    
    const jsonOperations = new JsonOperations({ dbPath: JSON_PATH }, { fs });
    const cacheProvider = new CacheProvider();
    
    const userService = new UserService(jsonOperations, cacheProvider); */

    const jsonBodyParser = bodyParser.json();

    app.use('/', routes);

    app.listen(3000, () => console.log(`App listening on port ${3000}!`));

})()

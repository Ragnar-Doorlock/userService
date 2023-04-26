const fs = require('node:fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const UsersRouterBuilder = require('./app/cocktroller.js');

const CreateUserInteractor = require('./app/users/createUser/createUserInteractor.js');
const DeleteUserInteractor = require('./app/users/deleteUser/deleteUserInteractor.js');
const GetUsergetUsersInteractors = require('./app/users/getUsers/getUsersInteractor.js');
const UpdateUserInteractor = require('./app/users/updateUser/updateUserInteractor.js');

const CacheProvider = require('./app/cacheProvider/cacheProvider.js');
const JsonOperations = require('./db/JSONOperations.js');
const UserService = require('./app/users/userService.js');

(async () => {

    const JSON_PATH = './db/db.json';
    const jsonOperations = new JsonOperations({ dbPath: JSON_PATH }, { fs });
    const cacheProvider = new CacheProvider();
    const userService = new UserService(jsonOperations, cacheProvider);
    
    const create_user_intearactor = new CreateUserInteractor(userService);
    const get_user = new GetUsergetUsersInteractors(userService);
    const update_user = new UpdateUserInteractor(userService);

    const usersRoutes = new UsersRouterBuilder({createInteractor: create_user_intearactor},
        {getInteractor: get_user}, {updateInteractor: update_user}, 
        {deleteInteractor: DeleteUserInteractor.deleteUserInteractor}, {router});

    app.use(express.json());
    app.use('/', usersRoutes.createRoutes());
    //app.post('/users/', create_user_intearactor.createUser);

    app.listen(3000, () => console.log(`App listening on port ${3000}!`));

})()

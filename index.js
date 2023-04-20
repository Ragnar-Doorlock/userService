const fs = require('node:fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonBodyParser = bodyParser.json();
const router = express.Router();
const UsersRouterBuilder = require('./app/cocktroller.js');
const CreateUserInteractor = require('./app/users/createUser/createUserInteractor.js');
const DeleteUserInteractor = require('./app/users/deleteUser/deleteUserInteractor.js');
const GetUsers = require('./app/users/getUsers/getUsersInteractor.js');
const UpdateUserInteractor = require('./app/users/updateUser/updateUserInteractor.js');

(async () => {

    const usersRoutes = new UsersRouterBuilder({createInteractor: CreateUserInteractor.createUserInteractor}, {getByIDInteractor: GetUsers.getUserByIDInteractor}, {getAllInteractor: GetUsers.getAllUsersInteractor}, {getOneInteractor: GetUsers.getOneUserInteractor}, {updateInteractor: UpdateUserInteractor.updateUserInteractor}, {deleteInteractor: DeleteUserInteractor.deleteUserInteractor}, {router});
    
    app.use(express.json());
    app.use('/', usersRoutes.createRoutes());

    app.listen(3000, () => console.log(`App listening on port ${3000}!`));

})()

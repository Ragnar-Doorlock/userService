const fs = require('node:fs');
const express = require('express');
const app = express();
//const router = express.Router();
const UsersRouterBuilder = require('./app/cocktroller.js');

const CacheProvider = require('./app/cache-provider/cacheProvider.js');
const JsonOperations = require('./db/JSONOperations.js');
const UserService = require('./app/users/userService.js');

(async () => {

    const JSON_PATH = './db/db.json';
    const jsonOperations = new JsonOperations({ dbPath: JSON_PATH }, { fs });
    const cacheProvider = new CacheProvider();
    const userService = new UserService(jsonOperations, cacheProvider);
    
    const usersRoutes = new UsersRouterBuilder({userService}, {express});

    app.use(express.json());
    app.use('/users', usersRoutes.createRoutes());

    app.listen(3000, () => console.log(`App listening on port ${3000}!`));

})()

const fs = require('node:fs');
const express = require('express');
const app = express();
//const routes = require('./cocktroller.js');
const UsersRouterBuilder = require('./app/cocktroller.js');

(async () => {

    const pizdaEbannaya = new UsersRouterBuilder();
    
    app.use('/', await pizdaEbannaya.createRoutes());

    app.listen(3000, () => console.log(`App listening on port ${3000}!`));

})()

const fs = require('node:fs');
const express = require('express');
const app = express();
const routes = require('./cocktroller.js');

(async () => {

    app.use('/', routes);

    app.listen(3000, () => console.log(`App listening on port ${3000}!`));

})()

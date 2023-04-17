const fs = require('node:fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const JsonOperations = require('./db/JSONOperations.js');
const CacheProvider = require('./app/cacheProvider/cacheProvider.js');
const UserService = require('./app/userService/userService.js');


(async () => {
    const JSON_PATH = './db/db.json';
    
    const jsonOperations = new JsonOperations({ dbPath: JSON_PATH }, { fs });
    const cacheProvider = new CacheProvider();
    
    const userService = new UserService(jsonOperations, cacheProvider);
    
    //const user = await userService.findOne({ name: 'Muxa' });
    //console.log(user);
    //const user = await userService.findById(1679478980204);
    //console.log(user);

    const jsonBodyParser = bodyParser.json(); //какая-то ебала, чтобы боди было видно

    app.get('/users/:userID', async (req, res) => {
        const user = await userService.findById(Number(req.params.userID));
        res.send(user);
    });

    app.post('/users/', jsonBodyParser, async (req, res) => {
        const userName = req.body.name;
        const userRole = req.body.role;

        await userService.create({name: userName, role: userRole});
        res.sendStatus(200);
    });

    app.put('/users/:userID', jsonBodyParser, async(req, res) => {
        const userID = req.params.userID;
        const userName = req.body.name;
        const userRole = req.body.role;

        //надо ли проверять есть в бд такое или нет, если нет, то выдавать эррор код какой-то?
        await userService.update({id: Number(userID), name: userName, role: userRole});
        res.sendStatus(200);
    });

    app.delete('/users/:userID', async (req, res) => {
        await userService.delete(Number(req.params.userID));
        res.sendStatus(200);
    });

    app.post('/users/search-all', jsonBodyParser, async (req, res) => {
        //и пох, что находит только одно, метода 2 в юзерсервисе, значит 2 эндпоинта
        if (req.body.id) {
            const user = await userService.findAll({id: Number(req.body.id)});
            res.send(user);
        }
        if (req.body.name) {
            const user = await userService.findAll({name: req.body.name});
            res.send(user);
        }
        if (req.body.role) {
            const user = await userService.findAll({role: req.body.role});
            res.send(user);
        }
    });

    app.post('/users/search-one', jsonBodyParser, async (req, res) => {
        if (req.body.id) {
            const user = await userService.findOne({id: Number(req.body.id)});
            res.send(user);
        }
        if (req.body.name) {
            const user = await userService.findOne({name: req.body.name});
            res.send(user);
        }
        if (req.body.role) {
            const user = await userService.findOne({role: req.body.role});
            res.send(user);
        }
    });
    
    app.listen(3000, () => console.log(`App listening on port ${3000}!`));

})()

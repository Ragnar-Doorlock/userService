const express = require('express');
const app = express();
const fs = require('node:fs')
const JsonOperations = require('../../../db/JSONOperations');
const CacheProvider = require('../../cacheProvider/cacheProvider.js');
const UserService = require('../userService.js');

const JSON_PATH = './db/db.json';
const jsonOperations = new JsonOperations({ dbPath: JSON_PATH }, { fs });
//const cacheProvider = require('../../../index.js');
//const cacheProvider = new CacheProvider();

/* function ebanina(cache) {

    const userService = new UserService(jsonOperations, cache);
    
    const createUserInteractor = async (req, res) => {

        const userName = req.body.name;
        const userRole = req.body.role;
    
        await userService.create({name: userName, role: userRole});
        res.sendStatus(200);
    };

    return createUserInteractor;
}

module.exports = {ebanina}; */

class CreateUserInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async createUser(req, res) {

        const userName = req.body.name;
        const userRole = req.body.role;

        await this.userService.create({name: userName, role: userRole});
        res.sendStarus(200);
    }
}

module.exports = CreateUserInteractor;


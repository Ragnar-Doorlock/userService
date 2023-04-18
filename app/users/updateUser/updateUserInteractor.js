const express = require('express');
const app = express();
const fs = require('node:fs')
const JsonOperations = require('../../../db/JSONOperations');
const CacheProvider = require('../../../app/cacheProvider/cacheProvider.js');
const UserService = require('../userService.js');

const JSON_PATH = './db/db.json';
const jsonOperations = new JsonOperations({ dbPath: JSON_PATH }, { fs });
const cacheProvider = new CacheProvider();
const userService = new UserService(jsonOperations, cacheProvider);

exports.updateUserInteractor = async(req, res) => {
    const userID = req.params.userID;
    const userName = req.body.name;
    const userRole = req.body.role;

    await userService.update({id: Number(userID), name: userName, role: userRole});
    res.sendStatus(200);
};

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

exports.getAllUsersInteractor = async (req, res) => {
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
};

exports.getOneUserInteractor = async (req, res) => {
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
};

exports.getUserByIDInteractor = async (req, res) => {
    const user = await userService.findById(Number(req.params.userID));
    res.send(user);
};
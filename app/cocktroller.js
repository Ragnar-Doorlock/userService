class UsersRouterBuilder {
    constructor ({createInteractor}, {getInteractor}, {updateInteractor}, {deleteInteractor}, {router}) {
        this.createUser = createInteractor;
        this.getUser = getInteractor;
        this.updateUser = updateInteractor;
        this.deleteUser = deleteInteractor;
        this.router = router;
    }

    createRoutes () {
        this.router.post('/users/', async (req, res) => {
            this.createUser.execute({name: req.body.name, role: req.body.role});
            res.sendStatus(200);
        });

        this.router.get('/users/:userID', async (req, res) => {
            const user = await this.getUser.executeByID(req.params.userID);
            res.send(user);
        });

        this.router.post('/users/search-all', async (req, res) => {
            const user = await this.getUser.executeAll(req.body); 
            res.send(user);
        });
        
        this.router.post('/users/search-one', async (req, res) => {
            const user = await this.getUser.executeOne(req.body);
            res.send(user);
        });
        //не робит чёт
        this.router.put('/users/:userID', async (req, res) => {
            this.updateUser.execute({id: req.params.userID, name: req.body.name, role: req.body.role});
            res.sendStatus(200);
        });
        //this.router.delete('/users/:userID', this.updateUser);

        return this.router;
    }
}

module.exports = UsersRouterBuilder;
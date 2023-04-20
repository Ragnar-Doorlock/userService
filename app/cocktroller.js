class UsersRouterBuilder {
    constructor ({createInteractor}, {getByIDInteractor}, {getAllInteractor}, {getOneInteractor}, {updateInteractor}, {deleteInteractor}, {router}) {
        this.createUser = createInteractor;
        this.getByID = getByIDInteractor;
        this.getAll = getAllInteractor;
        this.getOne = getOneInteractor;
        this.updateUser = updateInteractor;
        this.deleteUser = deleteInteractor;
        this.router = router;
    }

    createRoutes () {
        this.router.post('/users/', this.createUser);
        this.router.get('/users/:userID', this.getByID);
        this.router.post('/users/search-all', this.getAll);
        this.router.post('/users/search-one', this.getOne);
        this.router.put('/users/:userID', this.updateUser);
        this.router.delete('/users/:userID', this.updateUser);

        return this.router;
    }
}

module.exports = UsersRouterBuilder;
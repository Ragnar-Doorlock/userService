const CreateUserInteractor = require('../app/users/createUser/createUserInteractor');
const DeleteUserInteractor = require('../app/users/deleteUser/deleteUserInteractor');
const GetUsergetUsersInteractors = require('../app/users/getUsers/getUsersInteractor.js');
const UpdateUserInteractor = require('../app/users/updateUser/updateUserInteractor.js');

class UsersRouterBuilder {
    constructor ({userService}, {router}) {
        this.createUser = new CreateUserInteractor(userService);
        this.getUser = new GetUsergetUsersInteractors(userService);
        this.updateUser = new UpdateUserInteractor(userService);
        this.deleteUser = new DeleteUserInteractor(userService);
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
        
        this.router.put('/users/:userID', async (req, res) => {
            this.updateUser.execute({id: req.params.userID, name: req.body.name, role: req.body.role});
            res.sendStatus(200);
        });
        
        this.router.delete('/users/:userID', async (req, res) => {
            this.deleteUser.execute(req.params.userID);
            res.sendStatus(200);
        });

        return this.router;
    }
}

module.exports = UsersRouterBuilder;
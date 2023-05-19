const HttpPresenter = require('./httpPresenter');
const CreateUserInteractor = require('./users/create-user/createUserInteractor');
const DeleteUserInteractor = require('./users/delete-user/deleteUserInteractor');
const {GetUserInteractor} = require('./users/get-users/getUserInteractor.js');
const {SearchUsersInteractor} = require('./users/search-users/searchUserInteractor');
const UpdateUserInteractor = require('./users/update-user/updateUserInteractor.js');

class UsersRouterBuilder {
    constructor ({userService}, {express}) {

        this.userService = userService;
        this.router = express.Router();
    }

    createRoutes () {

        //после презентера не должно будет быть res.send 200/500
        this.router.post('/', async (req, res) => {

            /* const createUser = new CreateUserInteractor(this.userService);
            
            try {
                await createUser.execute({name: req.body.name, role: req.body.role});
                res.sendStatus(200);

            } catch(err) {
                
                res.status(err.httpCode).send(err);
            
            } */
            const presenter = new HttpPresenter(req, res);
            const interactor = new CreateUserInteractor({presenter, userService: this.userService});

            try {

                await interactor.execute({name: req.body.name, role: req.body.role});

            } catch(err) {

                presenter.presentFailure(err);

            }

        });

        this.router.get('/:userID', async (req, res) => {

            const getUser = new GetUserInteractor(this.userService);
            
            try {

                const user = await getUser.execute({id: req.params.userID});
                res.status(200).send(user);

            } catch (err) {

                res.status(err.httpCode).send(err);
            
            }

        });

        this.router.post('/search', async (req, res) => {

            const searchUser = new SearchUsersInteractor(this.userService);

            try {

                const user = await searchUser.execute({name: req.body.name, role: req.body.role});
                res.status(200).send(user);

            } catch (err) {

                res.status(err.httpCode).send(err);

            }

        });
        
        /* this.router.post('/search-one', async (req, res) => {
            const user = await this.searchUser.executeOne(req.body);
            res.send(user);
        }); */
        
        this.router.put('/:userID', async (req, res) => {
            
            const updateUser = new UpdateUserInteractor(this.userService);

            try {

                await updateUser.execute({id: req.params.userID, name: req.body.name, role: req.body.role});
                res.sendStatus(200);

            } catch (err) {

                res.status(err.httpCode).send(err);

            }
            
        });
        
        this.router.delete('/:userID', async (req, res) => {

            const deleteUser = new DeleteUserInteractor(this.userService);
            
            try {

                await deleteUser.execute({id: req.params.userID});
                res.sendStatus(200);

            } catch (err) {

                res.status(err.httpCode).send(err);

            }
            
        });

        return this.router;
    }

}

module.exports = UsersRouterBuilder;
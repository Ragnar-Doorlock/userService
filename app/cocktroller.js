const CreateUserInteractor = require('./users/create-user/createUserInteractor');
const DeleteUserInteractor = require('./users/delete-user/deleteUserInteractor');
const {GetUserInteractor} = require('./users/get-users/getUserInteractor.js');
const {SearchUsersInteractor} = require('./users/get-users/getUserInteractor');
const UpdateUserInteractor = require('./users/update-user/updateUserInteractor.js');
const ErrorHandler = require('./error-handler/apiError');
const errorHandler = new ErrorHandler();

class UsersRouterBuilder {
    constructor ({userService}, {express}) {
        this.createUser = new CreateUserInteractor(userService);
        this.getUser = new GetUserInteractor(userService);
        this.searchUser = new SearchUsersInteractor(userService);
        this.updateUser = new UpdateUserInteractor(userService);
        this.deleteUser = new DeleteUserInteractor(userService);
        this.router = express.Router();
    }

    createRoutes () {

        this.router.post('/', async (req, res) => {
            
            try {

                await this.createUser.execute({name: req.body.name, role: req.body.role});
                res.sendStatus(200);

            } catch(err) {
                
                res.status(err.httpCode).send(err);
            
            }
        });

        this.router.get('/:userID', async (req, res) => {
            
            try {

                const user = await this.getUser.execute(req.params.userID);
                res.status(200).send(user);

            } catch (err) {

                res.status(err.httpCode).send(err);
            
            }
        });

        this.router.post('/search', async (req, res) => {
            /* const user = await this.searchUser.execute(req.body); 
            res.send(user); */

            try {

                const user = await this.searchUser.execute(req.body);
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
            
            try {

                await this.updateUser.execute({id: req.params.userID, name: req.body.name, role: req.body.role});
                res.sendStatus(200);

            } catch (err) {

                res.status(err.httpCode).send(err);

            }
            
        });
        
        this.router.delete('/:userID', async (req, res) => {
            
            try {

                await this.deleteUser.execute(req.params.userID);
                res.sendStatus(200);

            } catch (err) {

                res.status(err.httpCode).send(err);

            }
            
        });

        return this.router;
    }
}

module.exports = UsersRouterBuilder;
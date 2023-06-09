const HttpPresenter = require('./httpPresenter');
const CreateUserInteractor = require('./users/create-user/createUserInteractor');
const DeleteUserInteractor = require('./users/delete-user/deleteUserInteractor');
const {GetUserInteractor} = require('./users/get-users/getUserInteractor.js');
const {SearchUsersInteractor} = require('./users/search-users/searchUserInteractor');
const UpdateUserInteractor = require('./users/update-user/updateUserInteractor.js');
const CreateInteractorValidator = require('../app/users/create-user/createInteractorValidator');
const GetInteractorValidator = require('./users/get-users/getIneractorValidator');
const DeleteInteractorValidator = require('./users/delete-user/deleteInteractorValidator');
const SearchInteractorValidator = require('./users/search-users/searchInteractorValidator');
const UpdateInteractorValidator = require('./users/update-user/updateInteractorValidator');


class UsersRouterBuilder {
    constructor ({userService}, {express}) {

        this.userService = userService;
        this.router = express.Router();
    }

    createRoutes () {

        this.router.post('/', async (req, res) => {

            const validator = new CreateInteractorValidator();
            const presenter = new HttpPresenter(req, res);
            const interactor = new CreateUserInteractor({presenter, userService: this.userService, validator});

            try {

                await interactor.execute({name: req.body.name, role: req.body.role});

            } catch(err) {

                presenter.presentFailure(err);

            }

        });

        this.router.get('/:userID', async (req, res) => {

            const validator = new GetInteractorValidator();
            const presenter = new HttpPresenter(req, res);
            const interactor = new GetUserInteractor({presenter, userService: this.userService, validator});
            
            try {

                await interactor.execute({id: req.params.userID});

            } catch (err) {

                presenter.presentFailure(err);
            
            }

        });

        this.router.post('/search', async (req, res) => {

            const validator = new SearchInteractorValidator();
            const presenter = new HttpPresenter(req, res);
            const interactor = new SearchUsersInteractor({presenter, userService: this.userService, validator});

            try {

                await interactor.execute({id: req.body.id, name: req.body.name, role: req.body.role});

            } catch (err) {

                presenter.presentFailure(err);

            }

        });
        
        /* this.router.post('/search-one', async (req, res) => {
            const user = await this.searchUser.executeOne(req.body);
            res.send(user);
        }); */
        
        this.router.put('/:userID', async (req, res) => {
            
            const validator = new UpdateInteractorValidator()
            const presenter = new HttpPresenter(req, res);
            const interactor = new UpdateUserInteractor({presenter, userService: this.userService, validator});

            try {

                await interactor.execute({id: req.params.userID, name: req.body.name, role: req.body.role});

            } catch (err) {

                presenter.presentFailure(err);

            }
            
        });
        
        this.router.delete('/:userID', async (req, res) => {

            const presenter = new HttpPresenter(req, res);
            const validator = new DeleteInteractorValidator();
            const interactor = new DeleteUserInteractor({presenter, userService: this.userService, validator});
            
            try {

                await interactor.execute({id: req.params.userID});

            } catch (err) {

                presenter.presentFailure(err);

            }
            
        });

        return this.router;
    }

}

module.exports = UsersRouterBuilder;
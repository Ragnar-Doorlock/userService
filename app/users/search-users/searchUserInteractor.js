const ValidationError = require('../../errors/validationError');
const ApiError = require('../../errors/apiError');
const NotFound = require('../../errors/notFound');
const BadRequest = require('../../errors/badRequest');

class SearchUsersInteractor {
    constructor ({presenter, userService, validator}) {
        this.userService = userService;
        this.presenter = presenter;
        this.validator = validator;
    }

    async execute({ id, name, role }) {

        const errors = this.validator.validate({id, name, role});

        if (errors.length > 0) {
            this.presenter.presentFailure( new ValidationError(errors) );
            return;
        }

        if (id) {
            
            const user = await this.userService.findAll({id});

            if (user.length === 0) {
                this.presenter.presentFailure( new NotFound(`User with id '${id}' was not found`) );
                return;
            }

            this.presenter.presentSuccess( user );
        
        }
            
        if (name && (name.length > 0)) {


            const user = await this.userService.findAll({name});
                
            if (user.length === 0) {
                this.presenter.presentFailure( new NotFound(`User with name '${name}' was not found`) );
                return;
            }

            this.presenter.presentSuccess( user );

        }
        
        if (role && (role.length > 0)) {

            const user = await this.userService.findAll({role});

            if (user.length === 0) {
                this.presenter.presentFailure ( new NotFound(`User with role '${role}' was not found`) );
                return;
            }

            this.presenter.presentSuccess( user );

        }
        
    }

}

module.exports = { SearchUsersInteractor };
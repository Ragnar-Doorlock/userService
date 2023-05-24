const ValidationError = require('../../errors/apiError');
const ApiError = require('../../errors/apiError');
const NotFound = require('../../errors/notFound');
const BadRequest = require('../../errors/badRequest');

class CreateUserInteractor {
    constructor ({presenter, userService, validator}) {
        this.userService = userService;
        this.presenter = presenter;
        this.validator = validator;
    }

    async execute({name, role}) {

        /* if (!name && !role) {
            this.presenter.presentFailure( new ValidationError('No name and role') );
            return;
        }

        if (role && (!['admin', 'visitor'].includes(role))) {
            this.presenter.presentFailure( new ValidationError('Incorrect role') );
            return;
        } */

        const errors = this.validator.validate({name, role});

        if (errors.length > 0) {

            this.presenter.presentFailure( new ValidationError(errors) );
            return;

        }

        await this.userService.create({name, role});

        return this.presenter.presentSuccess();

    }
    
}

module.exports = CreateUserInteractor;
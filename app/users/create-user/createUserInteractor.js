const ValidationError = require('../../errors/validationError');
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

        const errors = this.validator.validate({name, role});

        if (errors.length > 0) {

            this.presenter.presentFailure( new ValidationError(errors) );
            return;

        }

        await this.userService.create({name, role});

        this.presenter.presentSuccess();

    }
    
}

module.exports = CreateUserInteractor;
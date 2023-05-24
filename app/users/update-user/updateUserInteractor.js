const ValidationError = require('../../errors/validationError');
const ApiError = require('../../errors/apiError');
const NotFound = require('../../errors/notFound');
const BadRequest = require('../../errors/badRequest');

class UpdateUserInteractor {
    constructor ({presenter, userService, validator}) {
        this.userService = userService;
        this.presenter = presenter;
        this.validator = validator;
    }

    async execute({id, name, role}) {

        const errors = this.validator.validate({id, name, role});

        if (errors.length > 0) {
            this.presenter.presentFailure( new ValidationError(errors) );
            return;
        }

        const user = await this.userService.findById({id});

        if (user.length === 0) {
            
            this.presenter.presentFailure( new NotFound(`User with id '${id}' was not found`) );
            return;

        }

        await this.userService.update({id, name, role});
        return this.presenter.presentSuccess();

    }
    
}

module.exports = UpdateUserInteractor;
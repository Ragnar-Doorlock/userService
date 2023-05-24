const ValidationError = require('../../errors/validationError');
const ApiError = require('../../errors/apiError');
const NotFound = require('../../errors/notFound');
const BadRequest = require('../../errors/badRequest');

class DeleteUserInteractor {
    constructor ({presenter, userService, validator}) {
        this.userService = userService;
        this.presenter = presenter;
        this.validator = validator;
    }

    async execute ({id}) {

        const errors = this.validator.validate({id});

        if (errors.length > 0) {

            this.presenter.presentFailure( new ValidationError(errors) );
            return;

        }

        const user = await this.userService.findById({id});

        if (user.length === 0) {
                
            this.presenter.presentFailure( new NotFound(`User with id '${id}' was not found`) );
            return;

        }

        await this.userService.delete({id});
        return this.presenter.presentSuccess();

    }
    
}

module.exports = DeleteUserInteractor;
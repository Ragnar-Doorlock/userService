const ValidationError = require('../../errors/validationError');
const ApiError = require('../../errors/apiError');
const NotFound = require('../../errors/notFound');
const BadRequest = require('../../errors/badRequest');

class GetUserInteractor {
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

        // заменил проверку user === null, из-за новой логики поиска в юзер сервисе
        if (user.length === 0) {
            this.presenter.presentFailure( new NotFound(`User with id '${id}' was not found`) );
            return;
        }

        this.presenter.presentSuccess( user );
    }

}

module.exports = { GetUserInteractor };
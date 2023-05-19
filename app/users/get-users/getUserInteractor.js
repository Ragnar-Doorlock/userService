const ValidationError = require('../../errors/apiError');
const ApiError = require('../../errors/apiError');
const NotFound = require('../../errors/notFound');
const BadRequest = require('../../errors/badRequest');

class GetUserInteractor {
    constructor ({presenter, userService}) {
        this.userService = userService;
        this.presenter = presenter;
    }

    async execute ({id}) {

        const user = await this.userService.findById({id});

        // заменил проверку user === null, из-за новой логики поиска в юзер сервисе
        if (user.length === 0) {
            this.presenter.presentFailure( new NotFound(`User with id '${id}' was not found`) );
            return;
        }

        return this.presenter.presentSuccess( user );
    }

}

module.exports = { GetUserInteractor };
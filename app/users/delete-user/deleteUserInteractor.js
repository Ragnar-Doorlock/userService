const ValidationError = require('../../errors/apiError');
const ApiError = require('../../errors/apiError');
const NotFound = require('../../errors/notFound');
const BadRequest = require('../../errors/badRequest');

class DeleteUserInteractor {
    constructor ({presenter, userService}) {
        this.userService = userService;
        this.presenter = presenter;
    }

    async execute ({id}) {

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
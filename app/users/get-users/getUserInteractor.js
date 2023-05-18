const ValidationError = require('../../errors/apiError');
const ApiError = require('../../errors/apiError');
const NotFound = require('../../errors/notFound');
const BadRequest = require('../../errors/badRequest');

class GetUserInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute ({id}) {

        const user = await this.userService.findById({id});

        if (user === null) {
            throw new NotFound(`User with id '${id}' was not found`);
        }

        return user;
    }

}

module.exports = { GetUserInteractor };
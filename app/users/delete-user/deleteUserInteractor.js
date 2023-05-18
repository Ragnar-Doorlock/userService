const ValidationError = require('../../errors/apiError');
const ApiError = require('../../errors/apiError');
const NotFound = require('../../errors/notFound');
const BadRequest = require('../../errors/badRequest');

class DeleteUserInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute ({id}) {

        const user = await this.userService.findById({id});

        //скорее всего хуйня, хотя работает
        if (user.length === 0) {
                
            throw new NotFound(`User with id '${id}' was not found`);

        }

        await this.userService.delete({id});

    }
    
}

module.exports = DeleteUserInteractor;
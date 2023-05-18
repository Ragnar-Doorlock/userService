const ValidationError = require('../../errors/apiError');
const ApiError = require('../../errors/apiError');
const NotFound = require('../../errors/notFound');
const BadRequest = require('../../errors/badRequest');

class UpdateUserInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute({id, name, role}) {
            //const numberID = Number(id);
            const user = await this.userService.findById({id});

            if (user.length === 0) {
                
                throw new NotFound(`User with id '${id}' was not found`);

            }

            await this.userService.update({id, name, role});

    }
    
}

module.exports = UpdateUserInteractor;
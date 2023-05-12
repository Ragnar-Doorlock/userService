const ValidationError = require('../../errors/apiError');
const ApiError = require('../../errors/apiError');
const NotFound = require('../../errors/notFound');
const BadRequest = require('../../errors/badRequest');

class UpdateUserInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute({id, name, role}) {
        try {

            const numberID = Number(id);
            const userExists = await this.userService.findById(numberID);

            if (!userExists) {
                
                throw new NotFound(`User with id '${id}' was not found`);

            }

            await this.userService.update({id: numberID, name, role});

        } catch (err) {

            switch (err.name) {
                case 'ValidationError':
                    throw new ValidationError(err.stack);
                case 'SyntaxError':
                    throw new BadRequest(err.stack);
                case 'ReferenceError':
                    throw new ApiError(err.stack);
                case 'NotFound':
                    throw new NotFound(err.message);
                default:
                    throw new ApiError(err.stack);
            }

        }
        
    }
    
}

module.exports = UpdateUserInteractor;
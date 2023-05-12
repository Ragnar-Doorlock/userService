const ValidationError = require('../../errors/apiError');
const ApiError = require('../../errors/apiError');
const NotFound = require('../../errors/notFound');
const BadRequest = require('../../errors/badRequest');

class CreateUserInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute({name, role}) {

        try {
            //j
            await this.userService.create({name, role});
            
        } catch(err) {
            
            switch (err.name) {
                case 'ValidationError':
                    throw new ValidationError(err.stack);
                case 'SyntaxError':
                    throw new BadRequest(err.stack);
                case 'ReferenceError':
                    throw new ApiError(err.stack);
                default:
                    throw new ApiError(err.stack);
            }

        }

    }
    
}

module.exports = CreateUserInteractor;
const ValidationError = require('../../error-handler/apiError');
const ApiError = require('../../error-handler/apiError');
const NotFound = require('../../error-handler/notFound');
const BadRequest = require('../../error-handler/badRequest');

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
                    throw new ApiError(503, err.name, err.stack);
                default:
                    throw new ApiError(500, err.name, err.stack);
            }

        }

    }

    /* async execute({name, role}, res) {
        
        await this.userService.create({name, role});
        res.sendStatus(200);

    } */
}

module.exports = CreateUserInteractor;
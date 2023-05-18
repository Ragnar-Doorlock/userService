const ValidationError = require('../../errors/apiError');
const ApiError = require('../../errors/apiError');
const NotFound = require('../../errors/notFound');
const BadRequest = require('../../errors/badRequest');

class CreateUserInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute({name, role}) {

        if (!name && !role) {
            throw new ValidationError('No name and role');
        }

        if (role && (!['admin', 'visitor'].includes(role))) {
            throw new ValidationError('Incorrect role');
        }

        await this.userService.create({name, role});
            
    }
    
}

module.exports = CreateUserInteractor;
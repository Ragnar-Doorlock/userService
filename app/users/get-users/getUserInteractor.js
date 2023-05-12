const ValidationError = require('../../errors/apiError');
const ApiError = require('../../errors/apiError');
const NotFound = require('../../errors/notFound');
const BadRequest = require('../../errors/badRequest');

class GetUserInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute (id) {
        try {

            const user = await this.userService.findById(Number(id));
            
            if (user === null) {

                // хуйня то, шо и тут кидаю NotFound и далее в кетче снова NotFound?
                throw new NotFound(`User with id '${id}' was not found`);

            }
            return user;

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

class SearchUsersInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute({ id, name, role }) {
        try {

            if (id) {
                const numberID = Number(id);
                const user = await this.userService.findAll({id: numberID});
                if (user === null) {
                    throw new NotFound(`User with id '${id}' was not found`);
                }
                return user;
            }
            if (name) {
                const user = await this.userService.findAll({name});
                if (user === null) {
                    throw new NotFound(`User with name '${name}' was not found`);
                }
                return user;
            }
            if (role) {
                const user = await this.userService.findAll({role});
                if (user === null) {
                    throw new NotFound(`User with role '${role}' was not found`);
                }
                return user;
            }

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

    /* async executeOne({ id, name, role }) {
        if (id) {
            const user = await this.userService.findOne(Number({id}));
            return user;
        }
        if (name) {
            const user = await this.userService.findOne({name});
            return user;
        }
        if (role) {
            const user = await this.userService.findOne({role});
            return user;
        }
    } */

}

module.exports = { GetUserInteractor, SearchUsersInteractor };
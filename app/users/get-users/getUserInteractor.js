const ValidationError = require('../../error-handler/apiError');
const ApiError = require('../../error-handler/apiError');
const NotFound = require('../../error-handler/notFound');
const BadRequest = require('../../error-handler/badRequest');

class GetUserInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute (id) {
        try {

            const user = await this.userService.findById(Number(id));
            
            if (user === null) {

                // хуйня то, шо и тут кидаю NotFound и далее в кетче снова NotFound?
                // ну и вообще разобраться как бы допилить наследование классов и убрать ручное прописание кодов и месседжей...
                throw new NotFound(404, 'Not Found', `User with id '${id}' was not found`);

            }
            return user;

        } catch (err) {

            switch (err.name) {
                case 'ValidationError':
                    throw new ValidationError(err.stack);
                case 'SyntaxError':
                    throw new BadRequest(err.stack);
                case 'ReferenceError':
                    throw new ApiError(503, err.name, err.stack);
                case 'NotFound':
                    throw new NotFound(err.httpCode, err.message, err.stack);
                default:
                    throw new ApiError(500, err.name, err.stack);
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
                    throw new NotFound(404, 'Not Found', `User with id '${id}' was not found`);
                }
                return user;
            }
            if (name) {
                const user = await this.userService.findAll({name});
                if (user === null) {
                    throw new NotFound(404, 'Not Found', `User with name '${name}' was not found`);
                }
                return user;
            }
            if (role) {
                const user = await this.userService.findAll({role});
                if (user === null) {
                    throw new NotFound(404, 'Not Found', `User with role '${role}' was not found`);
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
                    throw new ApiError(503, err.name, err.stack);
                case 'NotFound':
                    throw new NotFound(err.httpCode, err.message, err.stack);
                default:
                    throw new ApiError(500, err.name, err.stack);
            }

        }
        
    }

    /* async execute({ id, name, role }) {
        if (id) {
            const user = await this.userService.findAll(Number({id}));
            return user;
        }
        if (name) {
            const user = await this.userService.findAll({name});
            return user;
        }
        if (role) {
            const user = await this.userService.findAll({role});
            return user;
        }
    } */

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
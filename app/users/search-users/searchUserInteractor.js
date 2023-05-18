const ValidationError = require('../../errors/apiError');
const ApiError = require('../../errors/apiError');
const NotFound = require('../../errors/notFound');
const BadRequest = require('../../errors/badRequest');

class SearchUsersInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute({ id, name, role }) {

        if (!id && !name && !role) {

            throw new ValidationError('ebat');
        
        }

        if (id && (id.length > 9)) {

            const user = await this.userService.findAll({id});

            if (user === null) {
                throw new NotFound(`User with id '${id}' was not found`);
            }

            return user;
        
        }
            
        if (name && (name.length > 0)) {


            const user = await this.userService.findAll({name});
                
            if (user === null) {
                throw new NotFound(`User with name '${name}' was not found`);
            }

            return user;

        }
        
        if (role && (role.length > 0)) {

            if (!['admin', 'visitor', 'new-role'].includes(role)) {
                throw new ValidationError('Incorrect role field');
            }

            const user = await this.userService.findAll({role});

            if (user === null) {
                throw new NotFound(`User with role '${role}' was not found`);
            }

            return user;

        }
        
    }

}

module.exports = { SearchUsersInteractor };
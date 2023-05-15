const ValidationError = require('../../errors/apiError');
const ApiError = require('../../errors/apiError');
const NotFound = require('../../errors/notFound');
const BadRequest = require('../../errors/badRequest');

class GetUserInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute (id) {

        // не работает... 
        /* if (id.length === 0) {
            throw new ValidationError('Incorrect id');
        } */

        const user = await this.userService.findById(id);

        if (user === null) {
            throw new NotFound(`User with id '${id}' was not found`);
        }

        return user;
    }

}

class SearchUsersInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute({ id, name, role }) {

        // не работает... 
        /* if (id && name && role === undefined) {

            throw new ValidationError('ebat');
        
        } */

        if (id) {

            // не работает... 
             if (!id) {
                throw new ValidationError('Incorrect id field');
            }

            const user = await this.userService.findAll({id});

            if (user === null) {
                throw new NotFound(`User with id '${id}' was not found`);
            }

            return user;
        
        }
            
        if (name) {

            // не работает...
            /* if (name.length === 0) {
                throw new ValidationError('Incorrect name field');
            } */

            const user = await this.userService.findAll({name});
                
            if (user === null) {
                throw new NotFound(`User with name '${name}' was not found`);
            }

            return user;

        }
        
        if (role) {

            //console.log(typeof JSON.parse(role)); вообще не реагирует если пустое поле

            //бля ну хз, все равно если пустое поле отправлять, то 200 ОК (ну охуеть)
            if (role !== 'visitor' || "admin" || 'new-role') {
                throw new ValidationError('Incorrect role field');
            }

            const user = await this.userService.findAll({role});

            if (user === null) {
                throw new NotFound(`User with role '${role}' was not found`);
            }

            return user;

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
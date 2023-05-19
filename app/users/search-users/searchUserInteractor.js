const ValidationError = require('../../errors/apiError');
const ApiError = require('../../errors/apiError');
const NotFound = require('../../errors/notFound');
const BadRequest = require('../../errors/badRequest');

class SearchUsersInteractor {
    constructor ({presenter, userService}) {
        this.userService = userService;
        this.presenter = presenter;
    }

    async execute({ id, name, role }) {

        if (!id && !name && !role) {

            this.presenter.presentFailure( new ValidationError('ebat') );
        
        }

        // 1. прикол, а шо длину не стринги незя померять? увидел шо id.length если это не стринга то undefined
        // и соответственно запрос бесконечно из-за этого летит
        // 2. Убрал эту проверку нахой, а то бесконечно летит запрос если id менее 9 символов
        if (id) {
            
            if (String(id).length < 10) {
                this.presenter.presentFailure( new ValidationError(`id is too short`) );
                return;
            }

            const user = await this.userService.findAll({id});

            if (user.length === 0) {
                this.presenter.presentFailure( new NotFound(`User with id '${id}' was not found`) );
                return;
            }

            return this.presenter.presentSuccess( user );
        
        }
            
        if (name && (name.length > 0)) {


            const user = await this.userService.findAll({name});
                
            if (user.length === 0) {
                this.presenter.presentFailure( new NotFound(`User with name '${name}' was not found`) );
                return;
            }

            return this.presenter.presentSuccess( user );

        }
        
        if (role && (role.length > 0)) {

            if (!['admin', 'visitor', 'new-role'].includes(role)) {
                this.presenter.presentFailure( new ValidationError('Incorrect role field') );
                return;
            }

            const user = await this.userService.findAll({role});

            if (user.length === 0) {
                this.presenter.presentFailure ( new NotFound(`User with role '${role}' was not found`) );
                return;
            }

            return this.presenter.presentSuccess( user );

        }
        
    }

}

module.exports = { SearchUsersInteractor };
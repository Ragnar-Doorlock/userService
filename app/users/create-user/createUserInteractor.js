const ValidationError = require('../../errors/apiError');
const ApiError = require('../../errors/apiError');
const NotFound = require('../../errors/notFound');
const BadRequest = require('../../errors/badRequest');

class CreateUserInteractor {
    constructor ({presenter, userService}) {
        this.userService = userService;
        this.presenter = presenter;
    }

    /* async execute({name, role}) {

        if (!name && !role) {
            throw new ValidationError('No name and role');
        }

        if (role && (!['admin', 'visitor'].includes(role))) {
            throw new ValidationError('Incorrect role');
        }

        await this.userService.create({name, role});
            
    } */

    async execute({name, role}) {

        if (!name && !role) {
            this.presenter.presentFailure( new ValidationError('No name and role') );
            return;
        }

        if (role && (!['admin', 'visitor'].includes(role))) {
            this.presenter.presentFailure( new ValidationError('Incorrect role') );
            return;
        }

        await this.userService.create({name, role});

        return this.presenter.presentSuccess({status: 200});

    }
    
}

module.exports = CreateUserInteractor;
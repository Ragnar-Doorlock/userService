const ValidationError = require('../../errorHandler');
const NotFound = require('../../errorHandler');
const BadRequest = require('../../errorHandler');

class CreateUserInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute({name, role}, res) {

        try {

            //
            //j
            //

            await this.userService.create({name, role});
            res.sendStatus(200);
        } catch(err) {
            if (err.name == 'ValidationError') {
                res.status(500).send(new ValidationError('Validation failed'));
            }
            if (err.name == 'SyntaxError') {
                res.status(400).send(new BadRequest('Bad request'));
            }
            else {
                res.status(500).send(err.name);
            }
        }

    }

    /* async execute({name, role}, res) {
        
        await this.userService.create({name, role});
        res.sendStatus(200);

    } */
}

module.exports = CreateUserInteractor;
const nameError = require('../../errors/pipaErrorsDescription');
const roleError = require('../../errors/pipaErrorsDescription');

class CreateUserValidator {
    
    validate({name, role}) {
        
        const errors = []

        if (!name && !role) {
            errors.push('Name and Role are required');
            return errors;
        }

        if (!name) {
            errors.push('name is required'); //nameError.required - берет из idError, неправильно импорт делаю, наверное
        }

        if (!role) {
            error.push(roleError.required);
        }
        
        if (!['admin', 'visitor'].includes(role)) {
            error.push(roleError.invalid);
        }

        return errors;
    }

}

module.exports = CreateUserValidator;
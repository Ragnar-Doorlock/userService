const nameError = require('../../errors/nameErrors');
const roleError = require('../../errors/roleErrors');

class CreateUserValidator {
    
    validate({name, role}) {
        
        const errors = []

        if (!name && !role) {
            errors.push('Name and Role are required');
            return errors;
        }

        if (!name) {
            errors.push(nameError.required);
        }

        if (!role) {
            errors.push(roleError.required);
        }
        
        if (!['admin', 'visitor'].includes(role)) {
            errors.push(roleError.invalid);
        }

        return errors;
    }

}

module.exports = CreateUserValidator;
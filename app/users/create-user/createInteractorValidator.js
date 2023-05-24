class CreateInteractorValidator {
    
    validate({name, role}) {
        
        const errors = []

        if (!name && !role) {
            errors.push('Name and Role are required');
        }

        if (!name) {
            errors.push('Name is required');
        }

        if (!role) {
            errors.push('Role is required');
        }
        
        if (!['admin', 'visitor'].includes(role)) {
            errors.push('Invalid role');
        }

        return errors;
    }

}

module.exports = CreateInteractorValidator;
class UpdateInteractorValidator {
    
    validate({id, name, role}) {
        
        const errors = []

        if (!id && !name && !role) {
            errors.push('ID, Name and Role parameters are required');
        }

        if (!id) {
            errors.push('ID is required');
        }

        if (id.length < 9) {
            errors.push('ID is too short');
        }

        if (!name) {
            errors.push('name is required');
        }

        if (!role) {
            errors.push('Role is required');
        }

        if (role && (!['admin', 'visitor', 'new-role'].includes(role))) {
            errors.push('Invalid role');
        }

        return errors;
    }

}

module.exports = UpdateInteractorValidator;
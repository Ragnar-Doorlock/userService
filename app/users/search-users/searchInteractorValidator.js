class SearchInteractorValidator {
    
    validate({id, name, role}) {
        
        const errors = []

        if (!id && !name && !role) {
            errors.push('At least one parameter is required');
        }

        if (id && (String(id).length < 9)) {
            errors.push('ID is too short');
        }

        //не отработает, name же false получается
        if (name && name.length === 0) {
            errors.push('Invalid name value');
            console.log(errors);
        }

        // та же хуйня
        if (role && role.length === 0) {
            errors.push('Invalid role value');
        }

        if (role && (!['admin', 'visitor', 'new-role'].includes(role))) {
            errors.push('Invalid role');
        }

        return errors;
    }

}

module.exports = SearchInteractorValidator;
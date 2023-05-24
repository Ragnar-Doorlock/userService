class GetInteractorValidator {
    
    validate({id}) {
        
        const errors = []

        if (!id) {
            errors.push('ID is required');
        }

        if (id.length < 9) {
            errors.push('ID is too short');
        }

        return errors;
    }

}

module.exports = GetInteractorValidator;
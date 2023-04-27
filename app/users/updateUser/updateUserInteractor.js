class UpdateUserInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute({id, name, role}) {
        const numberID = Number(id);
        await this.userService.update({id: numberID, name, role});
    }
}

module.exports = UpdateUserInteractor;
class DeleteUserInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute (id) {
        await this.userService.delete(Number(id));
    }
}

module.exports = DeleteUserInteractor;
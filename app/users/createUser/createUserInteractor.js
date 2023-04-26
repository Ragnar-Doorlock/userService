class CreateUserInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute({name, role}) {
        await this.userService.create({name, role});
    }
}

module.exports = CreateUserInteractor;
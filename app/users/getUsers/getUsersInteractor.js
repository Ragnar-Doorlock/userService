class getUsersInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async executeAll({ id, name, role }) {
        if (id) {
            const user = await this.userService.findAll(Number({id}));
            return user;
        }
        if (name) {
            const user = await this.userService.findAll({name});
            return user;
        }
        if (role) {
            const user = await this.userService.findAll({role});
            return user;
        }
    }

    async executeOne({ id, name, role }) {
        if (id) {
            const user = await this.userService.findOne(Number({id}));
            return user;
        }
        if (name) {
            const user = await this.userService.findOne({name});
            return user;
        }
        if (role) {
            const user = await this.userService.findOne({role});
            return user;
        }
    }

    async executeByID (id) {
        const user = await this.userService.findById(Number(id));
        return user;
    }
}

module.exports = getUsersInteractor;
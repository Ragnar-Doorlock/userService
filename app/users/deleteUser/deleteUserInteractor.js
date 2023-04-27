/* exports.deleteUserInteractor = async (req, res) => {
    await userService.delete(Number(req.params.userID));
    res.sendStatus(200);
}; */

class DeleteUserInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute (id) {
        await this.userService.delete(Number(id));
    }
}

module.exports = DeleteUserInteractor;
/* exports.updateUserInteractor = async(req, res) => {
    const userID = req.params.userID;
    const userName = req.body.name;
    const userRole = req.body.role;

    await userService.update({id: Number(userID), name: userName, role: userRole});
    res.sendStatus(200);
}; */

class UpdateUserInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute ({id, name, role}) {
        await this.userService.update({id, name, role});
    }
}

module.exports = UpdateUserInteractor;
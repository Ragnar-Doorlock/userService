class UserService {
    constructor(jsonOperations, cacheProvider) {
        this.jsonOperations = jsonOperations;
        this.cacheProvider = cacheProvider;
    }

    async create({ name, role }) {
        const dbInput = {
            id: Date.now(),
            name,
            role,
        };

        const users = await this.jsonOperations.getData();
        users.push(dbInput);

        await this.jsonOperations.writeData(users);

        this.cacheProvider.clear();

        //console.log('Cache cleared from .create(): ', this.cacheProvider.entries());
    }

    async update({ id, name, role }) {

        const numberID = Number(id);
        const users = await this.jsonOperations.getData(); 

        const valueExistsInDB = this._hasInDB(numberID, users);
        if (!valueExistsInDB) {
            //throw Error('User not found');
            return;
        }

        const updatedData = users.map((user) => {
            if (user.id !== numberID) {
                return user;
            }

            return {
                id: numberID,
                name,
                role,
            };
        });

        await this.jsonOperations.writeData(updatedData);

        this.cacheProvider.clear();
        //console.log('Cache cleared from .update(): ', this.cacheProvider.entries());

    }

    async delete({id}) {

        const numberID = Number(id);
        const users = await this.jsonOperations.getData();

        const valueExistsInDB = this._hasInDB(numberID, users);
        if (!valueExistsInDB) {
            return;
        }

        const updatedData = users.filter((user) => user.id !== numberID);

        await this.jsonOperations.writeData(updatedData);

        this.cacheProvider.clear();
        //console.log('Cache cleared from .delete(): ', this.cacheProvider.entries());

    }

    /* async findAll({ id, name, role }) {

        const numberID = Number(id);

        if (this.cacheProvider.has(`${id}_${name}_${role}`)) {
            //console.log('Get value from cache: ', this.cacheProvider.entries());

            return this.cacheProvider.get(`${id}_${name}_${role}`);
        }

        const users = await this.jsonOperations.getData();
        //console.dir(`1 ${users}`, {depth: 10});

        const user = users.find((u) => {
            if (id) {
                return u.id === numberID;
            }

            if (name) {
                return u.name === name;
            }

            if (role) {
                return u.role === role;
            }
        });

        if (!user) {
            return null;
        }

        this.cacheProvider.set(`${id}_${name}_${role}`, user);
        //console.log('Set value in cache: ', this.cacheProvider.entries());

        return user;
    } */

    async findAll({ id, name, role }) {
        const numberID = Number(id);

        if (this.cacheProvider.has(`${id}_${name}_${role}`)) {
            //console.log('Get value from cache: ', this.cacheProvider.entries());

            return this.cacheProvider.get(`${id}_${name}_${role}`);
        }

        const buffer = [];
    
        const users = await this.jsonOperations.getData();
        //console.dir(1 ${users}, {depth: 10});

        for (const user of users) {
            if (id) {
                if (user.id === numberID) buffer.push(user);
            }

            if (name) {
                if (user.name === name) buffer.push(user);
            }

            if (role) {
                if (user.role === role) buffer.push(user);
            }
        }

        this.cacheProvider.set(`${id}_${name}_${role}`, buffer);
        //console.log('Set value in cache: ', this.cacheProvider.entries());

        return buffer;
    }

    findOne({ id, name, role }) {
        const result = this.findAll({ id, name, role });
        return result;
    }

    findById({id}) {
        return this.findOne({ id });
    }

    _hasInDB(id, data) {
        return Boolean(data.find(array => array.id === id));
    }
}

module.exports = UserService;
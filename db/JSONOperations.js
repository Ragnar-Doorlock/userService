class JsonOperations {
    constructor({
        dbPath
    }, {
        fs
    }) {
        this.dbPath = dbPath;

        this.fs = fs;
    }

    async returnParsed() {
        const jsonData = await this.fs.promises.readFile(this.dbPath);

        return JSON.parse(jsonData);
    }

    async getData() {
        return this.returnParsed();
    }

    async writeData(data) {
        await this.fs.promises.writeFile(this.dbPath, JSON.stringify(data, null, 4), 'utf8');
    }

    get parsedLength() {
        return this.returnParsed().length;
    }
}

module.exports = JsonOperations;
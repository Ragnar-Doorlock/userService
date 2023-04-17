class Mapp {
    constructor(elements = []) {
        this.mapArray = [...elements];
    }

    set(newKey, value) {
        const valueExists = this.has(newKey);

        if (!valueExists) {
            this.mapArray.push([newKey, value]);
            return;
        }
        
        for (let i = 0; i <= this.mapArray.length - 1; i++) {
            const [key, value] = this.mapArray[i];
            
            if (key !== newKey) continue;

            this.mapArray.splice(i, 1, [newKey, value]);
        }
    }

    //
    entries() {
        return [...this.mapArray];
    }

    entries2() {
        return this.mapArray;
    }

    get(key) {
        return this.mapArray.find(array => array[0] === key);
    }

    has(key) {
        return Boolean(this.get(key));
    }

    delete(key) {
        for (let i = 0; i <= this.mapArray.length - 1; i++) {
            if (this.mapArray[i][0] === key) {
                this.mapArray.splice(i, 1);
            }
        }
    }

    clear() {
        this.mapArray = [];
    }

    get size() {
        return this.mapArray.length;
    }
}

module.exports = {Mapp};
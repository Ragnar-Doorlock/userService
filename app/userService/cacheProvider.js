const { Mapp } = require('./mymap.js');

class CacheProvider {
    constructor() {
        this.cache = new Mapp();
    }

    set(key, value) {
        this.cache.set(key, value);
    }

    get(key) {
        return this.cache.get(key);
    }

    has(key) {
        return this.cache.has(key);
    }

    clear() {
        this.cache.clear();
    }

    entries() {
        return this.cache.entries();
    }
}

module.exports = CacheProvider;

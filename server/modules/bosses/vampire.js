const Boss = require("./boss");

class Vampire extends Boss {
    constructor() {
        super('Vampire', 250, 20, 20);
    }
}

module.exports = Vampire;
const Boss = require("./boss");

class Dragon extends Boss {
    constructor() {
        super('Dragon', 250, 20, 20);
    }
}

module.exports = Dragon;
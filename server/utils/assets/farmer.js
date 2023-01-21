const Asset = require('./asset');

class Farmer extends Asset {
    constructor(type, name, income) {
        super(type, name, income);
    }

    harvest() {
        
    }
}

module.exports = Farmer;
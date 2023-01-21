const Asset = require('./asset');

class Factory extends Asset {
    constructor(type, name, income) {
        super(type, name, income);
    }

    harvest() {
        
    }
}

module.exports = Factory;
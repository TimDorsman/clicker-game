const Asset = require('./asset');

class Corporate extends Asset {
    constructor(type, name, income) {
        super(type, name, income);
    }

    harvest() {
        
    }
}

module.exports = Corporate;
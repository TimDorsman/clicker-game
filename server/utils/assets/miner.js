const Asset = require('./asset');

class Miner extends Asset {
    constructor(type, name, income) {
        super(type, name, income);
    }

    mine() {

    }
};

module.exports = Miner;
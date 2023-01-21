const Wallet = require('../../utils/wallet');
const Mine = require('../structures/mine');
const Asset = require('./asset');
const wallet = new Wallet();
const mine = new Mine();


class Miner extends Asset {
    constructor(type, name, income) {
        super(type, name, income);
        mine.increaseChanceOfOres();
    }

    mine() {
        
    }
};

module.exports = Miner;
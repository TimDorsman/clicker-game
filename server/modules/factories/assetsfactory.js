const Farmer = require('../assets/farmer');
const Miner = require('../assets/miner');
const Fighter = require('../assets/fighter');
const Factory = require('../assets/factory');
const Corporate = require('../assets/corporate');
const { FARMER, FIGHTER, MINER, FACTORY, CORPORATE } = require('../../../constants/assets');

class AssetsFactory {
    static build(asset) {
        const { type, name, income } = asset;

        switch(name) {
            case FARMER:
                return new Farmer(type, name, income);
            case FIGHTER:
                return new Fighter(type, name);
            case MINER:
                return new Miner(type, name, income);
            case FACTORY:
                return new Factory(type, name, income);
            case CORPORATE:
                return new Corporate(type, name, income);
            default:
                console.error(`Asset ${name} does not exist!`);
        }
    }
}

module.exports = AssetsFactory;
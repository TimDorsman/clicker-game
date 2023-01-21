const Farmer = require('./assets/farmer');
const Miner = require('./assets/miner');
const Factory = require('./assets/factory');
const Corporate = require('./assets/corporate');


class AssetsManager {
    static generate(asset) {
        const { type, name, income } = asset;

        switch(name) {
            case 'farmer':
                return new Farmer(type, name, income);
            case 'miner':
                return new Miner(type, name, income);
            case 'factory':
                return new Factory(type, name, income);
            case 'corporate':
                return new Corporate(type, name, income);

        }
    }
}

module.exports = AssetsManager;
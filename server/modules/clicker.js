
const Wallet = require('../utils/wallet');
const Inventory = require('../utils/inventory');
const Shop = require('../utils/shop');
const GameController = require('../utils/gamecontroller');

const gameController = new GameController();
const wallet = new Wallet();
const inventory = new Inventory();
const shop = new Shop();

// Wallet
const getWalletTotalFunc = function () {
    return wallet.getTotal();
};

const addCoinsToWalletFunc = function (amount) {
    return wallet.addCoins(amount);
};

// Game
const getAssetsFunc = function () {
    return inventory.getAssets();
};

const buyAssetFunc = function (name) {
    return shop.buyAsset(name)
}

module.exports = {
    getWalletTotalFunc,
    addCoinsToWalletFunc,
    getAssetsFunc,
    buyAssetFunc
}
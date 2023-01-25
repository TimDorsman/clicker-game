
const Wallet = require('../utils/wallet');
const Inventory = require('../utils/inventory');
const Shop = require('../utils/shop');
const GameController = require('../utils/gamecontroller');
const Merchant = require('../utils/merchant');

new GameController();
const wallet = new Wallet();
const inventory = new Inventory();
const shop = new Shop();
const merchant = new Merchant();

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

const sellProductFunc = function(type, product) {
    return merchant.sellProduct(type, product);
}

module.exports = {
    getWalletTotalFunc,
    addCoinsToWalletFunc,
    getAssetsFunc,
    buyAssetFunc,
    sellProductFunc
}
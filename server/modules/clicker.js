const GameController = require('../utils/gamecontroller');
const gameController = new GameController();
const wallet = gameController.getWallet();
const inventory = gameController.getInventory();
const shop = gameController.getShop();

// Wallet
const getWalletTotalFunc = function() {
	return wallet.getTotal();
};

const addCoinsToWalletFunc = function(amount) {
	return wallet.addCoins(amount);
};

// Game
const getAssetsFunc = function() {
    return inventory.getAssets();
};

const buyAssetFunc = function(name) {
    return shop.buyAsset(name)
}

module.exports = {
	getWalletTotalFunc,
	addCoinsToWalletFunc,
    getAssetsFunc,
    buyAssetFunc
}
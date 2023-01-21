const Inventory = require("./inventory");
const Shop = require("./shop");
const Wallet = require("./wallet");

class GameController {
    constructor() {
        this.inventory = new Inventory();
        this.wallet = new Wallet();
        this.shop = new Shop(this.inventory, this.wallet);
        this.startGeneratingMoney();
    }

    getInventory() {
        return this.inventory;
    }

    getWallet() {
        return this.wallet;
    }

    getShop() {
        return this.shop;
    }

    startGeneratingMoney() {
        setInterval(() => {
            const assets = this.inventory.getAssets();
            const totalGeneratedCoins = assets.reduce((currentValue, asset) => currentValue + asset.generateIncome(), 0);

            this.wallet.addCoins(totalGeneratedCoins);
        }, 1000)
    }
};

module.exports = GameController;

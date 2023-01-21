const { MINER } = require("../../constants/assets");
const Inventory = require("./inventory");
const Mine = require("./structures/mine");
const Wallet = require("./wallet");

const inventory = new Inventory();
const wallet = new Wallet();
const mine = new Mine();

class GameController {
    constructor() {
        if (GameController.instance) {
            return GameController.instance;
        }

        GameController.instance = this;

        this.startGeneratingMoney();
        mine.startMining();
    }

    startGeneratingMoney() {
        setInterval(() => {
            const assets = inventory.getAssets();
            const totalGeneratedCoins = assets.reduce((currentValue, asset) => currentValue + asset.generateIncome(), 0);

            wallet.addCoins(totalGeneratedCoins);
        }, 1000);
    }
};

module.exports = GameController;
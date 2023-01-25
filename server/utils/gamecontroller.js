const { MINER } = require("../../constants/assets");
const Inventory = require("./inventory");
const Mine = require("./structures/mine");
const Wallet = require("./wallet");

const inventory = new Inventory();
const wallet = new Wallet();
const mine = new Mine();

class GameController {
	GENERATE_MONEY_INTERVAL;

	constructor() {
		if (GameController.instance) {
			return GameController.instance;
		}

		GameController.instance = this;
		this.GENERATE_MONEY_INTERVAL = 1000;
		this.startGeneratingMoney();
		mine.startMining();
	}

	startGeneratingMoney() {
		setInterval(() => {
			const assets = inventory.getAssets();
			let totalGeneratedCoins = 0;

			for(const value of Object.values(assets)) {
				if(!value.length) continue;
				totalGeneratedCoins += value.reduce((currentValue, asset) => currentValue + asset.generateIncome(), 0);
			}

			wallet.addCoins(totalGeneratedCoins);
		}, this.GENERATE_MONEY_INTERVAL);
	}
};

module.exports = GameController;
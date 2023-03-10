const { assetsList } = require('../data/assets.json');
const { oreList } = require('../data/ores.json');
const { build } = require('./factories/assetsfactory');
const Inventory = require('./inventory');
const Wallet = require('./wallet');
const { ASSETS } = require('../../constants/inventory');

class Shop {
	constructor() {
		this.inventory = new Inventory();
		this.wallet = new Wallet();
		this.assetsList = assetsList;
		this.oreList = oreList;
	}

	buyAsset(name) {
		const selectedAsset = this.assetsList.find(asset => asset.name === name);

		if (!selectedAsset) {
			return {
				result: false,
				error: `Asset '${name}' does not exist`,
			}
		}

		if (this.wallet.getTotal() < selectedAsset.price) {
			return {
				result: false,
				error: `You don't have enough coins to purchase this asset (need ${selectedAsset.price})`,
			}
		}

		const assetClass = build(selectedAsset);
		this.wallet.takeCoins(selectedAsset.price);
		this.inventory.addItem(ASSETS, assetClass);

		return {
			result: true,
			data: `Succesfully bought '${name}' for ${selectedAsset.price} coins`
		}
	}

	sellProduct(product) {
		if(!product) {
			return;
		}

		if(oreList.some(ore => ore.name === product)) {
			console.warn('Ore is valid!');
			return true;
		}
	}
}

module.exports = Shop;

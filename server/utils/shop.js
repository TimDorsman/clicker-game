const { priceList } = require('../data/pricelist.json');
const { build } = require('./assetsfactory');
const Inventory = require('./inventory');
const Wallet = require('./wallet');

class Shop {
	constructor() {
		this.inventory = new Inventory();
		this.wallet = new Wallet();
		this.priceList = priceList;
	}

	buyAsset(name) {
		const selectedAsset = this.priceList.find(asset => asset.name === name);

		if (!selectedAsset) {
			return {
				result: false,
				error: `Asset '${name}' does not exist`,
			}
		}

		if (this.wallet.getTotal() < selectedAsset.price) {
			return {
				result: false,
				error: 'You don\'t have enough coins to purchase this asset' + selectedAsset.price
			}
		}

		const assetClass = build(selectedAsset);
		this.wallet.takeCoins(selectedAsset.price);
		this.inventory.addAsset(assetClass);

		return {
			result: true,
			data: `Succesfully bought '${name}' for ${selectedAsset.price} coins`
		}
	}
}

module.exports = Shop;

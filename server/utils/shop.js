const { priceList } = require('../data/pricelist.json');
const { generate } = require('./assetsmanager');

class Shop {
	constructor(inventory, wallet) {
		this.inventory = inventory;
		this.wallet = wallet;
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
				error: 'You don\'t have enough coins to purchase this asset'
			}
		}

		const assetClass = generate(selectedAsset);

		this.wallet.takeCoins(selectedAsset.price);
		this.inventory.addAsset(assetClass);

		return {
			result: true,
			data: `Succesfully bought '${name}' for ${selectedAsset.price} coins`
		}
	}
}

module.exports = Shop;

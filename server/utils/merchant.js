const { wsio } = require("../../websocket-server");
const Inventory = require("./inventory");
const Wallet = require("./wallet");

const inventory = new Inventory();
const wallet = new Wallet();

class Merchant {
    constructor() {
        this.discountPercentage = 0;
        this.respect = 0;
    }

    sellProduct(type, product) {
        if(!inventory.getItemByName(type, product).length) {
            return {
                result: false,
                error: `You don't have any '${product}' to sell`,
            }
        }

        const removedItems = inventory.removeItems(type, product);
        const profit = removedItems.reduce((currentValue, items) => currentValue + items.price, 0);
        
        wallet.addCoins(profit);
        const hasOres = new Boolean(Object.keys(inventory.getOres()).length);
        wsio.emit('update-ores', hasOres)

        return {
            result: true,
            data: `Succesfully sold your ${removedItems.length} ${product} for ${profit} coins`,
        }
    }
};

module.exports = Merchant;
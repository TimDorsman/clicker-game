const { wsio } = require("../../websocket-server");
const Inventory = require("./inventory");
const LevelTracker = require("./user/progress/level-tracker");
const Wallet = require("./wallet");

const levelTracker = new LevelTracker();
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

        const soldItems = inventory.removeItems(type, product);
        const profit = soldItems.reduce((currentValue, items) => currentValue + items.price, 0);
        
        wallet.addCoins(profit);

        const hasOres = new Boolean(Object.keys(inventory.getOres()).length);
        levelTracker.addExperience(soldItems);
        wsio.emit('update-inventory', hasOres);

        return {
            result: true,
            data: `Succesfully sold your ${soldItems.length} ${product} for ${profit} coins`,
        }
    }


};

module.exports = Merchant;
const { MERGED, FLAT, ASSETS } = require("../../constants/inventory");
const { ORES } = require("../../constants/ores");

class Inventory {
    constructor() {
        if(Inventory.instance) {
            return Inventory.instance;
        }

        Inventory.instance = this;
        this.ores = new Map();
        this.assets = new Map();
    };

    getAssets() {
        return this.formatByItem(ASSETS, FLAT)
    }

    getOres() {
        return this.formatByItem(ORES, MERGED)
    }

    addItem(type, item) {
        if(!this[type].has(item.name)) {
            this[type].set(item.name, [item]);
            return;
        }

        const assets = this[type].get(item.name);
        assets.push(item);
        this[type].set(item.name, assets);
    }

    removeItems(type, name, amount = 'all') {
        // Remove all items from a category
        if(amount === 'all') {
            const removedItems = this[type].get(name);
            this[type].set(name, [])
            return removedItems
        }

        const categorizedItems = this[type].get(name);
        const removedItems = categorizedItems.splice(0, amount);

        this[type].set(categorizedItems);

        return removedItems;
    }

    getItemByName(type, name) {
        return this[type].get(name);
    }

    formatByItem(item, sorting = MERGED) {
        if(sorting === MERGED) {
            const tempObj = {};
            for(const [key, value] of this[item].entries()) {
                if(!tempObj[key] && value.length) {
                    const totalSum = value.reduce((currentValue, prop) => currentValue + prop.price, 0);
                    value[0].totalPrice = totalSum;
                    value[0].amount = value.length;
                    tempObj[key] = value[0];
                    continue;
                }
            }

            return tempObj
        }
        else if(sorting === FLAT) {
            let tempArr = [];

            for(const value of this[item].values()) {
                tempArr = [...tempArr, value];
            }

            return tempArr;
        }

        console.warn("[INVENTORY] - sorting not recognized: ", sorting);
    }
}

module.exports = Inventory;
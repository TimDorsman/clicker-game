const { MERGED, SPLIT } = require("../../constants/inventory");
const { wsio } = require("../../websocket-server");

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
        return this.formatByItem('assets', SPLIT)
    }

    getOres() {
        return this.formatByItem('ores', MERGED)
    }

    getAssetsByName(name) {
        return this.assets.get(name) ?? [];
    }

    addAsset(asset) {
        if(!this.assets.has(asset.name)) {
            console.log("Setting new set for", asset.name);
            this.assets.set(asset.name, [asset]);
            return;
        }

        const assets = this.assets.get(asset.name);
        assets.push(asset);
        this.assets.set(asset.name, assets);
    }

    getOreByName(name) {
        return this.ores.get(name);
    }

    addOre(ore) {
        if(!this.ores.has(ore.name)) {
            this.ores.set(ore.name, [ore]);
            return;
        }

        const ores = this.ores.get(ore.name);
        ores.push(ore);
        this.ores.set(ore.name, ores);
    }

    formatByItem(item, type = MERGED) {

        if(type === MERGED) {
            const tempObj = {};
            for(const [key, value] of this[item].entries()) {
                if(!tempObj[key]) {
                    const totalSum = value.reduce((currentvalue, prop) => currentvalue + prop.price, 0);
                    value[0].totalPrice = totalSum;
                    value[0].amount = value.length;
                    tempObj[key] = value[0];
                    continue;
                }
            }

            return tempObj
        }
        else if(type === SPLIT) {
            let tempArr = [];

            for(const value of this[item].values()) {
                tempArr = [...tempArr, value];
            }

            return tempArr;
        }

        console.warn("[INVENTORY] - Type not recognized: ", type);
    }
}

module.exports = Inventory;
class Inventory {
    constructor() {
        if(Inventory.instance) {
            return Inventory.instance;
        }

        Inventory.instance = this;

        this.assets = [];
    };

    getAssets() {
        return this.assets;
    }

    getTotalOfAsset(type) {
        return this.assets.filter(asset => asset.type === type);
    }

    addAsset(asset) {
        this.assets.push(asset);
    }
}

module.exports = Inventory;
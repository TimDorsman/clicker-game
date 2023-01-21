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

    getAllAssetByType(type) {
        return this.assets.filter(asset => asset.type === type);
    }

    getAllAssetsByName(name) {
        return this.assets.filter(asset => asset.name === name);
    }

    addAsset(asset) {
        this.assets.push(asset);
    }
}

module.exports = Inventory;
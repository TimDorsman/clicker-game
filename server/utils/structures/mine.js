const { MINER } = require('../../../constants/assets');
const lodash = require('lodash');
const ores = require('../../data/ores.json');
const Inventory = require('../inventory');
const inventory = new Inventory();

class Mine {
    constructor() {
        this.ores = ores;
        this.MINIMUM_MINERS_PER_LEVEL = 20;
    }

    increaseChanceOfOres() {
        const allMiners = inventory.getAllAssetsByName(MINER);
        const totalMiners = allMiners.length;
        const increaseChancePercentage = totalMiners % this.MINIMUM_MINERS_PER_LEVEL === 0 ? 1 : 0;

        this.ores = this.ores.map(ore => {
            ore.chance += increaseChancePercentage;
            return ore;
        })
        console.log("New Percentage", increaseChancePercentage, this.ores);
    }

    startMining() {
        setInterval(() => {
            console.log("Mining...");
            const foundOres = this.ores.filter(ore => {
                const propability = lodash.random(1, 1000);
                console.log("[Chance] -", ore.type, propability / 10)
                const foundOre = lodash.inRange(propability, 0, (ore.chance * 10) + 1);
                return foundOre;
            });

            if(!foundOres.length) {
                return;
            }

            if(foundOres.length > 1) {
                console.log("Your miner(s) have found some new ores:", foundOres.map(ore => ore.type).join(', '));
                const rndNum = lodash.random(0, foundOres.length - 1);
                const selectedOre = foundOres[rndNum];
    
                console.log("The winning ore is " + selectedOre.type);
            }
            else {
                console.log("Your miner(s) have found a new ore:", foundOres[0].type)
            }

        }, 1000);
    }
}

module.exports = Mine;
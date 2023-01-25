const { getSocketClients, wsio } = require('../../../websocket-server');
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
        const allMiners = inventory.getAssetsByName(MINER);
        const totalMiners = allMiners.size;
        const increaseChancePercentage = totalMiners % this.MINIMUM_MINERS_PER_LEVEL === 0 ? 1 : 0;

        this.ores = this.ores.map(ore => {
            ore.chance += increaseChancePercentage;
            return ore;
        })
    }

    startMining() {
        setInterval(() => {
            // console.log("Mining...")
            const foundOres = this.ores.filter(ore => {
                const propability = lodash.random(1, 1000);
                const foundOre = lodash.inRange(propability, 0, (ore.chance * 10) + 1);
                return foundOre;
            });

            if (!foundOres.length) {
                return;
            }

            if (foundOres.length === 1) {
                console.log("Your miner(s) have found a new ore:", foundOres[0].name)
                inventory.addOre(foundOres[0]);
            }
            else {
                console.log("Your miner(s) have found some new ores:", foundOres.map(ore => ore.name).join(', '));
                const rndNum = lodash.random(0, foundOres.length - 1);
                const selectedOre = foundOres[rndNum];

                console.log("The winning ore is " + selectedOre.name);
                inventory.addOre(selectedOre);
            }

            wsio.emit('receive-ore', inventory.getOres());
        }, 100);
    }
}

module.exports = Mine;
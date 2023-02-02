const lodash = require('lodash');
const { wsio } = require('../../../websocket-server');
const { MINER } = require('../../../constants/assets');
const { oreList }  = require('../../data/ores.json');
const { ASSETS } = require('../../../constants/inventory');

const Inventory = require('../inventory');
const { ORES } = require('../../../constants/ores');
const inventory = new Inventory();

class Mine {
    #MINING_INTERVAL = 500;

    constructor() {
        this.name = 'Mine';
        this.oreList = oreList;
        this.MINIMUM_MINERS_PER_LEVEL = 20;
    }

    increaseChanceOfOres() {
        const allMiners = inventory.getItemByName(ASSETS, MINER);
        const totalMiners = allMiners.size;
        const increaseChancePercentage = totalMiners % this.MINIMUM_MINERS_PER_LEVEL === 0 ? 1 : 0;

        this.oreList = this.oreList.map(ore => {
            ore.chance += increaseChancePercentage;
            return ore;
        })
    }

    startMining() {
        setInterval(() => {
            const foundOres = this.oreList.filter(ore => {
                const propability = lodash.random(1, 1000);
                const foundOre = lodash.inRange(propability, 0, (ore.chance * 10) + 1);
                return foundOre;
            });

            if (!foundOres.length) {
                return;
            }

            if (foundOres.length === 1) {
                // console.log("Your miner(s) have found a new ore:", foundOres[0].name)
                inventory.addItem(ORES, foundOres[0]);
            }
            else {
                // console.log("Your miner(s) have found some new ores:", foundOres.map(ore => ore.name).join(', '));
                const rndNum = lodash.random(0, foundOres.length - 1);
                const selectedOre = foundOres[rndNum];

                // console.log("The winning ore is " + selectedOre.name);
                inventory.addItem(ORES, selectedOre);
            }

            wsio.emit('update-inventory', true);
        }, this.#MINING_INTERVAL);
    }
}

module.exports = Mine;
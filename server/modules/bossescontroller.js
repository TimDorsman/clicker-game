const lodash = require('lodash');

const { build } = require("./factories/bossesfactory");
const { bossesList } = require('../data/bosses.json');
const { ASSETS } = require('../../constants/inventory');

const Inventory = require('./inventory');
const { FIGHTER } = require('../../constants/assets');
const inventory = new Inventory();

class BossesController {
	#FETCHING_INTERVAL = 1000;
	#FIND_BOSS_PERCENTAGE = 100;

	constructor() {
		if (BossesController.instance) {
			return BossesController.instance;
		}

		BossesController.instance = this;

		this.bossHistory = [];
		this.currentBoss = null;
		this.fetchPaused = false;
		this.fighters = [];
		this.intervalID = null;
		this.bossDied = false;

		this.startFetching();
	}

	startFetching() {
		this.bossDied = false;
		this.intervalID = setInterval(() => {
			if(this.fetchPaused) {
				clearInterval(this.intervalID);
				return;
			}

			if(this.hasFoundABoss()) {
				this.fetchPaused = true;
				this.currentBoss = this.getRandomBoss();
				console.log("Found a new Boss!", this.currentBoss.name);
			}
		}, this.#FETCHING_INTERVAL);
	}

	hasFoundABoss() {
		const rndNum = lodash.random(1, 100);

		return rndNum <= this.#FIND_BOSS_PERCENTAGE;
	}

	pauseFetching() {
		this.fetchPaused = true;
	}

	getRandomBoss() {
		// @TODO: Make a randomizer with multiple bosses
		return build(bossesList[0].name);
	}

	startFight() {
		this.fighters = inventory.getItemByName(ASSETS, 'fighter');

		if(!this.fighters.length) {
			return {
				error: 'You don\'t have any fighters'
			}
		}


		for(let i=0; i < lodash.clamp(this.fighters.length, 0, 5); i++) {
			this.currentBoss = this.fighters[i].attack(this.currentBoss);
			this.fighters[i] = this.currentBoss.attack(this.fighters[i])
			
			if(this.currentBoss.getHealth() <= 0) {
				this.bossDied = true;
				break;
			}
		}

		// Remove all the dead fighters
		this.fighters = this.fighters.filter(fighter => fighter.getHealth() >= 0);

		// Replenish the remaining soldiers
		if(this.bossDied) {
			this.fighters = this.fighters.map(fighter => {
				fighter.replenishHealth();
				return fighter;
			})
		}

		inventory.updateItems(ASSETS,FIGHTER ,this.fighters);

		return {
			boss: this.currentBoss,
			fighters: this.fighters,
		}
	}
};

module.exports = BossesController;
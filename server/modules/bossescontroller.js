const lodash = require('lodash');
const wsio = require('../utils/wsio')();

const { build } = require("./factories/bossesfactory");
const { bossesList } = require('../data/bosses.json');
const { ASSETS } = require('../../constants/inventory');
const { FIGHTER } = require('../../constants/assets');

const Inventory = require('./inventory');
const inventory = new Inventory();

class BossesController {
	#FETCHING_INTERVAL = 1000;
	#FIND_BOSS_PERCENTAGE = 10;

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
		if(this.intervalID) {
			return;
		}

		this.bossDied = false;
		this.fetchPaused = false;

		this.intervalID = setInterval(() => {
			console.log("Fetching...")
			if(this.fetchPaused) {
				clearInterval(this.intervalID);
				this.intervalID = null;
				return;
			}

			if(this.hasFoundABoss()) {
				this.fetchPaused = true;
				this.currentBoss = this.getRandomBoss();
				console.log('Boss found', this.currentBoss.name)
				wsio.emit('boss-encountered', this.currentBoss);
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
		const rnd = lodash.random(0, bossesList.length - 1);
		return build(bossesList[rnd].name);
	}

	getCurrentBoss() {
		return this.currentBoss;
	}

	startFight(data) {
		if(!data.fight) {
			this.startFetching();
			return false;
		}
		this.fighters = inventory.getItemByName(ASSETS, 'fighter');

		if(!this.fighters.length) {
			return {
				error: 'You don\'t have any fighters'
			}
		}

		let damageTaken = this.currentBoss.getHealth();
		for(let i=0; i < lodash.clamp(this.fighters.length, 0, 5); i++) {
			this.currentBoss = this.fighters[i].attack(this.currentBoss);
			this.fighters[i] = this.currentBoss.attack(this.fighters[i])
			
			if(this.currentBoss.getHealth() <= 0) {
				this.bossDied = true;
				break;
			}
		}

		damageTaken -= this.currentBoss.getHealth();

		// Remove all the dead fighters
		this.fighters = this.fighters.filter(fighter => fighter.getHealth() >= 0);
		this.currentBoss.damageTaken = damageTaken;

		// Replenish the remaining soldiers
		if(this.bossDied) {
			this.fighters = this.fighters.map(fighter => {
				fighter.replenishHealth();
				return fighter;
			})
			inventory.updateItems(ASSETS, FIGHTER, this.fighters);
			
			// Since the boss died we can start looking for new bosses
			this.startFetching();

			// Let the client know the boss died
			return {
				boss: this.currentBoss,
				loot: ["Staff"]
			}
		}

		inventory.updateItems(ASSETS, FIGHTER, this.fighters);

		return {
			boss: this.currentBoss,
			fighters: this.fighters,
		}
	}

	cancelFight() {

	}
};

module.exports = BossesController;
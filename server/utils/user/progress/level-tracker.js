const { wsio } = require('../../../../websocket-server');
const { experienceList } = require('../../../data/experience.json');
const lodash = require('lodash');

class LevelTracker {
    constructor() {
        if(LevelTracker.instance) {
            return LevelTracker.instance;
        }

        LevelTracker.instance = this;
        this.experienceList = experienceList;
        this.stage = 1;
        this.experience = 0;
        this.minimumExperience = 250;
        this.defaultIncrementer = 25;
        this.progress = 100 / this.minimumExperience * this.experience;
    }

    getProgress() {
        return this.progress;
    }

    getStage() {
        return this.stage;
    }

    getExperience() {
        return this.experience;
    }

    getMinimumExperience() {
        return this.minimumExperience;
    }

    addExperience(value) {
        if(!Array.isArray(value)) {
            this.handleExperience(value)
            return;
        }

        const totalExperience = this.getGeneratedExperience(value);
        this.handleExperience(totalExperience);
    }

    handleExperience(amount) {
        this.experience += amount ?? this.defaultIncrementer;

        while(this.experience >= this.minimumExperience) {
            console.log("Level up!");
            this.useSpareExperience();
            this.increaseIncrementer();
            this.increaseLevel();
        }

        wsio.emit('update-level-info', {
            experience: this.experience,
            minimumExperience: this.minimumExperience,
            progress: 100 / this.minimumExperience * this.experience,
            stage: this.stage,
        });
    }

    getGeneratedExperience(items) {
        if(Array.isArray(items)) {
            const foundListItems = items.map(item => experienceList.find(listItem => listItem.name === item.name));

            const totalExperience = foundListItems.reduce((currentValue, listItem) => currentValue + lodash.random(listItem.minExperience, listItem.maxExperience), 0);
            return totalExperience;
        }

        throw new Error('getGeneratedExperience expects type of array');
    }

    increaseLevel() {
        this.stage++;
        this.minimumExperience += this.defaultIncrementer;
    }

    // When you level up, use the spare experience for the next level
    useSpareExperience() {
        const newStartingXP = this.experience - this.minimumExperience;
        this.experience = newStartingXP > 0 ? newStartingXP : 0;
    }

    increaseIncrementer() {
        this.defaultIncrementer += this.stage * 25;
    }
}

module.exports = LevelTracker;

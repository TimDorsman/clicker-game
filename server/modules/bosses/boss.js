const lodash = require('lodash');

class Boss {
    constructor(name, health, damage, defenceChance) {
        this.name = name;
        this.health = health;
        this.damage = damage;
        this.defenceChance = defenceChance;
    }

    getHealth() {
        return this.health;
    }

    takeDamage(damage) {
        this.health -= damage;
        console.log("Dragon has taken damage", damage, "current health is", this.health);
    }

    attack(fighter) {
        fighter.health -= this.damage;
        return fighter;
    }

    defend() {
        const hasDefended = lodash.range(1, lodash.random(1, 100), this.defenceChance + 1)
        return hasDefended
    }
}

module.exports = Boss;
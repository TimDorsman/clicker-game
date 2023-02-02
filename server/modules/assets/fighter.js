const Asset = require("./asset");

class Fighter extends Asset {
    constructor(type, name) {
        super(type, name, 0);
        this.maxHealth = 25;
        this.health = this.maxHealth;
        this.damage = 10;
    }

    getHealth() {
        return this.health;
    }

    replenishHealth() {
        this.health = this.maxHealth;
    }

    attack(boss) {
        boss.health -= this.damage;
        return boss;
    }
}

module.exports = Fighter;
const { DRAGON, VAMPIRE } = require("../../../constants/bosses");
const Bosses = require('../bosses');

class BossesFactory { 
    static build(boss) {
        switch(boss) {
            case DRAGON:
                return new Bosses.Dragon();
            case VAMPIRE:
                return new Bosses.Vampire();
            default:
                return `Unable to get boss '${boss}'`;
        }
    }
}

module.exports = BossesFactory;
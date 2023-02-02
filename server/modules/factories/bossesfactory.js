const { DRAGON } = require("../../../constants/bosses");
const Dragon = require("../bosses/dragon");

class BossesFactory { 
    static build(boss) {
        switch(boss) {
            case DRAGON:
                return new Dragon();
            default:
                return `Unable to get boss '${boss}'`;
        }
    }
}

module.exports = BossesFactory;
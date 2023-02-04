const wsio = require('./server/utils/wsio')();
const BossesController  = require('./server/modules/bossescontroller');
const bossesController = new BossesController();

let shouldReload = true;

wsio.on('connection', (socket) => {
    wsio.emit('server-reload', shouldReload);

    shouldReload = false;

    socket.on('update-fight', (data) => {
        const fightResult = bossesController.startFight(data);
        wsio.emit('update-fight', fightResult);
    })
})

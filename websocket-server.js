const BossesController  = require('./server/modules/bossescontroller');
const bossesController = new BossesController();

const wsio = require('socket.io')(8000, {
    cors: {
        origin: ['http://localhost:3000']
    }
})

let shouldReload = true;

wsio.on('connection', (socket) => {
    wsio.emit('server-reload', shouldReload);

    shouldReload = false;

    socket.on('update-fight', (data) => {
        const fightResult = bossesController.startFight(socket);
        wsio.emit('update-fight', fightResult);
    })
})

module.exports = {
    wsio
}

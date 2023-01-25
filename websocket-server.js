const wsio = require('socket.io')(8000, {
    cors: {
        origin: ['http://localhost:3000']
    }
})

let shouldReload = true;

wsio.on('connection', (socket) => {
    socket.on('send-ore', (data) => {
        // console.log('Found ore:', data);
    })

    wsio.emit('server-reload', shouldReload);

    shouldReload = false;
})

module.exports = {
    wsio
}
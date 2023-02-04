let wsio;
module.exports = () => {
    if (!wsio) {
        wsio = require('socket.io')(8000, {
            cors: {
                origin: ['http://localhost:3000']
            }
        })
    }

    return wsio;
}
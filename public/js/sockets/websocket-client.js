const socket = io('http://localhost:8000');

window.socket = socket;

socket.on('server-reload', (data) => {
    console.log("Server reloaded!");

    if(data) {
        location.reload();
    }
})

require('./ores');

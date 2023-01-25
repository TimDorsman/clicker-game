(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { socket } = window;
const inventoryList = document.querySelector('.inventory-list');

socket.on('receive-ore', async (data) => {
    const resp = await fetch('/p/inventory')
    .then(res => res.json())
    .then(html => {
        inventoryList.innerHTML = html.data;
    })
})
},{}],2:[function(require,module,exports){
const socket = io('http://localhost:8000');

window.socket = socket;

socket.on('server-reload', (data) => {
    console.log("Server reloaded!");

    if(data) {
        location.reload();
    }
})

require('./ores');

socket.on('connect', () => {
    console.log("Socket client", socket.id);
    socket.emit('send-ore', 'Gold');
})



},{"./ores":1}]},{},[2]);

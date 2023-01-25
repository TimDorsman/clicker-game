const { socket } = window;
const inventoryList = document.querySelector('.inventory-list');

socket.on('receive-ore', async (data) => {
    const resp = await fetch('/p/inventory')
    .then(res => res.json())
    .then(html => {
        inventoryList.innerHTML = html.data;
    })
})
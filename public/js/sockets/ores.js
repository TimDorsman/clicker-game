const { socket } = window;
const inventoryList = document.querySelector('.inventory-list');

function addListeners() {
    const sellButtons = document.querySelectorAll('.inventory-sell');
    sellButtons?.forEach(button => button.addEventListener('click', () => {
        const { type, product } = button.dataset;

        fetch('/merchant/product/sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type,
                product
            })
        })
        .then(res => res.json())
        .then(response => {
            console.log('Sell item', response);
        })
        
    }))
};

addListeners();

socket.on('update-ores', async (hasOres) => {
    // Receive partial
    if(!hasOres) {
        inventoryList.innerHTML = '';
        return;
    }

    await fetch('/p/inventory')
    .then(res => res.json())
    .then(html => {
        inventoryList.innerHTML = html.data;

        addListeners();
    })
});




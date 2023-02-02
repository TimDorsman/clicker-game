const { socket } = window;

const startFightButton = document.querySelector('#startFight');
const cancelFightButton = document.querySelector('#cancelFight');

startFightButton.addEventListener('click', () => {
    socket.emit('update-fight', {
        fight: true
    });
})

cancelFightButton.addEventListener('click', () => {
    const bossOverlay = document.querySelector('.boss-overlay');
    bossOverlay.addEventListener('transitionend', () => {
        setTimeout(() => {
            bossOverlay.remove();            
        }, 100);
    })
    bossOverlay.style.opacity = 0;

    socket.emit('update-fight', {
        fight: false
    })
})

socket.on('update-fight', (data) => {
    if(data.error) {
        window.alert(data.error)
    }

    if(data.boss) {
        const bossHealth = document.querySelector('#bossHealth');
        const damageTakenEl = document.createElement('span');

        damageTakenEl.classList.add('boss-overlay-damage-taken');
        damageTakenEl.innerText = `-${data.boss.health}`;
        damageTakenEl.addEventListener('animationend', () => damageTakenEl.remove())
        bossHealth.parentElement.prepend(damageTakenEl);

        bossHealth.innerText = data.boss.health;
        bossHealth.addEventListener('transitionend', () => {
            bossHealth.classList.remove('damaged');
            bossHealth.removeEventListener('transitionend', this)
        });


        bossHealth.classList.add('damaged');
    }

    if(data.fighters) {
        const fightersButtonAmount = document.querySelector('#fighterBuy span');
        fightersButtonAmount.innerText = data.fighters.length;
    }
});

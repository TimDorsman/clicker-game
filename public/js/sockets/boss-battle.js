const { socket } = window;

socket.on('boss-encountered', async () => {
	await fetch('/p/boss-battle')
	.then(res => res.json())
	.then(html => {
		const mainContainer = document.querySelector('.main');
		mainContainer.insertAdjacentHTML('afterbegin', html.data);

		const startFightButton = document.querySelector('#startFight');
		const cancelFightButton = document.querySelector('#cancelFight');

		console.log("fightButtons", startFightButton, cancelFightButton)

		startFightButton.addEventListener('click', () => {
			console.log("Fight!");
			socket.emit('update-fight', {
				fight: true,
			});
		})

		cancelFightButton.addEventListener('click', removeOverlay)
	})
})

socket.on('update-fight', (data) => {
	if(data.error) {
		window.alert(data.error)
	}

	console.log("Data", data);
	if(data.boss) {
		const bossHealth = document.querySelector('#bossHealth');
		const damageTakenEl = document.createElement('span');

		damageTakenEl.classList.add('boss-overlay-damage-taken');
		damageTakenEl.innerText = `-${data.boss.damageTaken}`;
		damageTakenEl.addEventListener('animationend', () => damageTakenEl.remove())
		bossHealth.parentElement.prepend(damageTakenEl);

		bossHealth.innerText = data.boss.health;
		bossHealth.addEventListener('transitionend', () => {
			bossHealth.classList.remove('damaged');
			bossHealth.removeEventListener('transitionend', this)

			if(data.boss.health <= 0) {
				// alert(`You've defeated the ${data.boss.name}`)
				removeOverlay();
				return;
			}
		});

		bossHealth.classList.add('damaged');
	}

	if(data.fighters) {
		const fightersButtonAmount = document.querySelector('#fighterBuy span');
		fightersButtonAmount.innerText = data.fighters.length;
	}
});

function removeOverlay() {
	const bossOverlay = document.querySelector('.boss-overlay');
	bossOverlay.addEventListener('transitionend', () => {
		setTimeout(() => {
			bossOverlay.remove();      
			socket.emit('update-fight', {
				fight: false
			})      
		}, 100);
	})
	bossOverlay.style.opacity = 0;
}

const manualButton = document.querySelector('#manualButton');
const coinTotal = document.querySelector('#coin-total');
const buyAssetButtons = document.querySelectorAll('[data-event="buyAsset"]');

(async function init() {
	updateCoinDisplay();

	setInterval(() => {
		updateCoinDisplay();
	}, 1000);

[...buyAssetButtons].forEach(button => button.addEventListener('click', buyAsset))

})();

manualButton.addEventListener('click', async () => {
	await addCoins(1);
})

// Async
async function addCoins(amount) {
	await fetch('/wallet/add', {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			amount
		}),
	})
	.then(text => text.json())
	.then(() => {
		updateCoinDisplay();
	})
}

async function getWalletTotal() {
	const response = await fetch('/wallet/total')
	.then(text => text.json())

	return response.data.total;
}

async function updateCoinDisplay() {
	const totalCoins = await getWalletTotal();
	coinTotal.innerText = totalCoins;
}

async function getAssets() {
	return await fetch('/game/assets')
	.then(text => text.json());
}

async function buyAsset(e) {
	const { currentTarget } = e;
	const { name } = currentTarget.dataset;

	const response = await fetch('/game/asset/buy', {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name
		}),
	})
	.then(text => text.json());

	if(!response.result) {
		alert(response.error)
		return;
	}

	const assetTotalEl = currentTarget.querySelector('span');
	assetTotalEl.innerText = parseInt(assetTotalEl.innerText) + 1;
	updateCoinDisplay();
}



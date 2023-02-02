(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Sockets
require('./sockets/websocket-client');
require('./sockets/ores');
require('./sockets/level-tracker');
require('./sockets/boss-battle');

// UI
require('./modules/wallet');
require('./modules/error-message');
},{"./modules/error-message":2,"./modules/wallet":3,"./sockets/boss-battle":4,"./sockets/level-tracker":5,"./sockets/ores":6,"./sockets/websocket-client":7}],2:[function(require,module,exports){
const closeButton = document.querySelector('.error-message-close');
const errorMessageContainer = document.querySelector('.error-message');

closeButton.addEventListener('click', () => {
    errorMessageContainer.classList.add('hidden');
})

},{}],3:[function(require,module,exports){
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



},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
const { socket } = window;

const progressBar = document.querySelector('.level-tracker-progress');
const levelStage = document.querySelector('.level-stage');
const levelCurrentXP = document.querySelector('.level-current-experience');
const levelMinXP = document.querySelector('.level-min-experience');

let currentStage = 1;
let currentProgress = 0;
let currentMinimumExperience = levelMinXP.innerText;

socket.on('update-level-info', async ({ experience, minimumExperience, progress, stage }) => {
    if(stage > currentStage) {
        levelCurrentXP.innerText = currentMinimumExperience;
        await moveProgressBarTransition(100);
        updateStageDisplay(stage);
        progressBar.style.width = '0%';
    }

    currentMinimumExperience = minimumExperience;

    levelCurrentXP.innerText = experience;
    levelMinXP.innerText = minimumExperience;

    currentStage = stage;
    setTimeout(async () => {
        await moveProgressBarTransition(progress);
    }, 100)
});

function moveProgressBarTransition(percentage) {
    return new Promise(resolve => {
        progressBar.classList.add('transition');
        progressBar.style.width = percentage + '%';

        progressBar.addEventListener('transitionend', () => {
            progressBar.classList.remove('transition');
            progressBar.removeEventListener('transitionend', this);
            resolve(true);
        })
    })
}

function updateStageDisplay(stage) {
    levelStage.classList.add('start-animation');

    setTimeout(() => {
        levelStage.innerText = stage;
    }, 1000);

    levelStage.addEventListener('animationend', () => {
        levelStage.classList.remove('start-animation');
        levelStage.removeEventListener('animationend', this);
    })
}

},{}],6:[function(require,module,exports){
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
        })
        
    }))
};

addListeners();

socket.on('update-inventory', async (hasOres) => {
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




},{}],7:[function(require,module,exports){
const socket = io('http://localhost:8000');

window.socket = socket;

socket.on('server-reload', (data) => {
    console.log("Server reloaded!");

    if(data) {
        location.reload();
    }
})

},{}]},{},[1]);

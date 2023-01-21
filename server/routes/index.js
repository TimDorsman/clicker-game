const { addUser } = require('../api/user/post');
const { getUser, getUsers } = require('../api/user/get');

const { addCoinsToWallet } = require('../api/wallet/post');
const { getWalletTotal } = require('../api/wallet/get');

const { getAssets } = require('../api/game/get');
const { buyAsset } = require('../api/game/post');

module.exports = function(app) {
	// Add user
	addUser(app);
	getUser(app);
	getUsers(app);

	// -----------
	// Wallet
	addCoinsToWallet(app);
	getWalletTotal(app);
	
	// Game
	buyAsset(app);
	getAssets(app);
    //other routes..
}

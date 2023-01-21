const { addCoinsToWalletFunc, getWalletTotalFunc } = require('../../modules/clicker');

const addCoinsToWallet = (app) => app.post('/wallet/add', (req, res) => {
    try {
        addCoinsToWalletFunc(req.body.amount);
        
        const walletTotal = getWalletTotalFunc();
        res.status(200).send({
            result: true,
            data: walletTotal
        })
    }
    catch(err) {
        res.status(500).send({
            result: false,
            error: 'Something went wrong: ' + err.message,
        })
        return;
    }
});

module.exports = {
    addCoinsToWallet,
}
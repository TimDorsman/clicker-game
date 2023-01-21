const { getWalletTotalFunc } = require('../../modules/clicker');

const getWalletTotal = (app) => app.get('/wallet/total', (req, res) => {
    if (req.error) {
        res.status(500).send({
            result: false,
            error: 'Something went wrong',
        })
        return;
    }

    const walletTotal = getWalletTotalFunc();
    res.status(200).send({
        result: true,
        data: {
            total: walletTotal,
        }
    })
});

module.exports = {
    getWalletTotal,
}

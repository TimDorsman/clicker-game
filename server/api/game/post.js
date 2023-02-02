const { buyAssetFunc } = require('../../dist/clicker');

const buyAsset = (app) => app.post('/game/asset/buy', (req, res) => {
    if(req.error) {
        res.status(500).send({
            result: false,
            error: req.error,
        })
        return;
    }

    const result = buyAssetFunc(req.body.name)

    res.status(200).send(result)
});

module.exports = {
    buyAsset,
}
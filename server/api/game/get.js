const { getAssetsFunc } = require('../../dist/clicker');

const getAssets = (app) => app.get('/game/assets', (req, res) => {
    if(req.error) {
        res.status(500).send({
            result: false,
            error: "Something went wrong",
        })
        return;
    }

    res.status(200).send({
        result: true,
        data: {
            assets: getAssetsFunc()
        }
    })
});

module.exports = {
    getAssets,
}
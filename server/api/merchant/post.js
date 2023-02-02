const { sellProductFunc } = require('../../dist/clicker');

const sellProduct = (app) => app.post('/merchant/product/sell', (req, res) => {
	if(req.error) {
		statusError(res, req.error)
		return;
	}

	if(!req.body.type || !req.body.product) {
		statusError(res, "Missing parameters!");
		return;
	}

    const { type, product } = req.body;
	const result = sellProductFunc(type, product);

    if(!result.result) {
        statusError(res, result.error);
    }

	statusOK(res, result.data);
});

function statusOK(res, data) {
	res.status(200).send({
		result: true,
		data
	})
}

function statusError(res, message) {
	res.status(500).send({
		result: false,
		error: 'Something went wrong: ' + message
	})
}

module.exports = {
	sellProduct,
} 

const { addUserFunc } = require('../../modules/users');

const addUser = (app) => app.post('/user/add', (req, res) => {
	if(req.error) {
		statusError(res, req.error)
		return;
	}

	if(!req.body.name || !req.body.age) {
		statusError(res, "Missing parameters!");
		return;
	}

	addUserFunc(req.body);
	statusOK(res, "User succesfully added");
});

function statusOK(res, message) {
	res.status(200).send({
		result: true,
		data: {
			message
		}
	})
}

function statusError(res, message) {
	res.status(500).send({
		result: false,
		error: 'Something went wrong: ' + message
	})
}

module.exports = {
	addUser,
} 

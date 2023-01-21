const { getUserFunc, getUsersFunc } = require('../../modules/users');

const getUser = (app) => app.get('/user/single', (req, res) => {
	if(req.error) {
		res.status(500).send({
			result: false,
			error: 'Something went wrong',
		})
		return;
	}

	res.status(200).send({
		result: true,
		data: getUserFunc(),
	})
});

const getUsers = (app) => app.get('/user/all', (req, res) => {
	if(req.error) {
		res.status(500).send({
			result: false,
			error: 'Something went wrong',
		})
		return;
	}

	res.status(200).send({
		result: true,
		data: getUsersFunc()
	})
});

module.exports = {
	getUser,
	getUsers
};

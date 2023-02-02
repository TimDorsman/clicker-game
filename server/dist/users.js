const users = [];

const addUserFunc = function(name) {
	users.push(name);
};

const getUsersFunc = function() {
	return users;
};

module.exports = {
	addUserFunc,
	getUsersFunc
}
var UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//create admin
var createadmin = () => {
	const password = "123456";

	bcrypt
		.hash(password, saltRounds)
		.then((hash) => {
			var tempdata = new UserModel({
				name: "The ABC",
				password: hash,
				emailid: "abc@gmail.com",
				contact: "+65 12345678",
				type: "ADMIN",
			});

			tempdata
				.save()
				.then(() => console.log("Admin created"))
				.catch((err) => console.log("err1", err));
		})
		.catch((err) => console.log("err2", err));
};

var hashPassword = (password) => {
	return new Promise((resolve, reject) => {
		bcrypt
			.hash(password, saltRounds)
			.then((hash) => resolve(hash))
			.catch((err) => reject(err));
	});
};

module.exports = {
	createadmin,
	hashPassword,
};

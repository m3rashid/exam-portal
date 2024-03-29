var mongoose = require("mongoose");

//database connection
mongoose.Promise = global.Promise;
const options = {
	autoIndex: false,
	reconnectTries: 100,
	reconnectInterval: 500,
	poolSize: 10,
	bufferMaxEntries: 0,
	useNewUrlParser: true,
	useFindAndModify: false,
};

mongoose
	.connect("mongodb://mongodb:27017/exam-portal", options)
	.then(() => {
		console.log("connected to mongoDB");
	})
	.catch((err) => {
		console.log("Error connecting to database", err);
	});

module.exports = mongoose;

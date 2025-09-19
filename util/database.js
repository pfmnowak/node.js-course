require('dotenv').config();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
	MongoClient.connect(process.env.MONGO_URL)
		.then((client) => {
			console.log('Connected to Database');
			callback(client);
		})
		.catch((error) => {
			console.error('Connection failed', error);
		});
};

module.exports = mongoConnect;

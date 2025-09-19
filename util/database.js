require('dotenv').config();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
	MongoClient.connect(process.env.MONGO_URL)
		.then((client) => {
			console.log('Connected to Database');
			_db = client.db();
			callback();
		})
		.catch((error) => {
			console.error('Connection failed', error);
			throw error;
		});
};

const getDb = () => {
	if (_db) {
		return _db;
	}
	throw 'No database found!';
};

module.exports = {
	mongoConnect,
	getDb,
};

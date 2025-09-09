const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
	MongoClient.connect(
		'mongodb+srv://pfmnowak_db_user:<3z2ZKkTJtJbqeP5p@cluster0.ksbjywm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
		.then((client) => {
			console.log('Connected to Database');
			callback(client);
		})
		.catch((error) => {
			console.error('Connection failed', error);
		});
};

module.exports = mongoConnect;

const mysql = require('mysql2');

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'node-js-course',
	password: 'password',
});

module.exports = pool.promise();

require('dotenv').config();
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	User.findById('68e40ee4348c439131dd0d2f')
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => {
			console.error(err);
		});
});

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404);

mongoose
	.connect(process.env.MONGO_URL)
	.then((result) => {
		console.log('Connected to MongoDB by Mongoose');
		app.listen(3000);
	})
	.catch((err) => {
		console.error('Connection to MongoDB failed', err);
	});

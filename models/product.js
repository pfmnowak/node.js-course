const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Product {
	constructor(title, imageUrl, description, price) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		const db = getDb();
		return db
			.collection('products')
			.insertOne(this)
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	static fetchAll() {
		const db = getDb();
		return db
			.collection('products')
			.find()
			.toArray()
			.then((products) => {
				console.log(products);
				return products;
			})
			.catch((err) => {
				console.error(err);
			});
	}

	static findById(prodId) {
		const db = getDb();
		return (
			db
				.collection('products')
				.find({ _id: new mongodb.ObjectId(`${prodId}`) })
				// This also works
				// .find({ _id: mongodb.ObjectId.createFromHexString(prodId) })
				.next()
				.then((product) => {
					console.log(product);
					return product;
				})
				.catch((err) => {
					console.error(err);
				})
		);
	}
}

module.exports = Product;

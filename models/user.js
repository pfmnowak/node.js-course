const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
	constructor(name, email, cart, id) {
		this.name = name;
		this.email = email;
		this.cart = cart;
		this._id = id ? new mongodb.ObjectId(`${id}`) : null;
	}

	save() {
		const db = getDb();
		return db
			.collection('users')
			.insertOne(this)
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	addToCart(product) {
		const cartProductIndex = this.cart.items.findIndex((cp) => {
			return cp.productId.toString() === product._id.toString();
		});
		let newQuantity = 1;
		const updatedCartItems = [...this.cart.items];

		if (cartProductIndex >= 0) {
			newQuantity = updatedCartItems[cartProductIndex].quantity + 1;
			updatedCartItems[cartProductIndex].quantity = newQuantity;
		} else {
			updatedCartItems.push({
				productId: new mongodb.ObjectId(`${product._id}`),
				quantity: newQuantity,
			});
		}

		const updatedCart = {
			items: updatedCartItems,
		};

		const db = getDb();
		return db
			.collection('users')
			.updateOne({ _id: new mongodb.ObjectId(`${this._id}`) }, { $set: { cart: updatedCart } });
	}

	static findById(userId) {
		const db = getDb();
		return db
			.collection('users')
			.find({ _id: new mongodb.ObjectId(`${userId}`) })
			.next()
			.then((user) => {
				console.log(user);
				return user;
			})
			.catch((err) => {
				console.error(err);
			});
	}
}

module.exports = User;

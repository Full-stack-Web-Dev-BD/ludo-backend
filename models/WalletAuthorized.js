const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const walletSchema = new Schema({
	wallet: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	details: {
		type: String
	},
	isAuthorized: {
		type: Boolean,
		default: false
	},
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = WalletAuthorized = mongoose.model('walletAuthorized', walletSchema);
const express = require('express');

const router = express.Router();
const Wallet = require('../../models/WalletAuthorized');



router.get('/', (req, res) => {
	console.log("finding  wallet ")
	Wallet.find()
		.then(requests => res.json(requests))
		.catch(err => res.status(404).json(err));
})


router.post('/', (req, res) => {
	if (!req.body.wallet || !req.body.name) {
		return res.status(400).json({ message: "Wallet address and name required !!" })
	}
	const newRequest = new Wallet({
		wallet: req.body.wallet,
		name: req.body.name,
		details: req.body.details,
	});
	newRequest.save()
		.then(request => res.json(request))
		.catch(err => res.json(err));
})


router.put('/:id', (req, res) => {
	Wallet.findOne({ wallet: req.params.id })
		.then(wallet => {
			Wallet.findByIdAndUpdate(wallet._id, { isAuthorized: !wallet.isAuthorized }, { new: true })
				.then(updatedWallet => {
					res.json({ message: "Updated status", updatedWallet })
				})
				.catch(err => res.status(404).json({ status: 'No wallet  founded' }));
		})
})

module.exports = router;
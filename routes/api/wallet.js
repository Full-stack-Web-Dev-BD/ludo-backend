const express = require('express');

const router = express.Router();
const Wallet = require('../../models/WalletAuthorized');



router.get('/authorized', (req, res) => {
	Wallet.find({isAuthorized:true})
		.then(requests => res.json(requests))
		.catch(err => res.status(404).json(err));
})


router.get('/unauthorized', (req, res) => {
	console.log("finding  wallet ")
	Wallet.find({isAuthorized:false})
		.then(requests => res.json(requests))
		.catch(err => res.status(404).json(err));
})
router.get('/find/:id', (req, res) => {
	console.log("finding  wallet ")
	Wallet.find({wallet:req.params.id})
		.then(request => res.json(request))
		.catch(err => res.status(404).json(err));
})


router.post('/', (req, res) => {
	if (!req.body.wallet || !req.body.name) {
		return res.status(400).json({ message: "Wallet address and name required !!" })
	}
	Wallet.find({ wallet: req.body.wallet })
		.then(doc => {
			console.log(doc)
			if (doc.length>0) {
				return res.json({ status: true, message:"Request already sent !!" })
			} else {
				const newRequest = new Wallet({
					wallet: req.body.wallet,
					name: req.body.name,
					details: req.body.details,
				});
				newRequest.save()
					.then(request => res.json(request))
					.catch(err => res.json(err));
			}
		})
})


router.put('/:id', (req, res) => {
	Wallet.findOne({ wallet: req.params.id })
		.then(wallet => {
			console.log(wallet)
			if(!wallet){
				return res.status(404).json({message:"Request not finded !!"})
			}
			Wallet.findByIdAndUpdate(wallet._id, { isAuthorized: !wallet.isAuthorized }, { new: true })
				.then(updatedWallet => {
					res.json({ message: "Updated status", updatedWallet })
				})
				.catch(err => res.status(404).json({ status: 'No wallet  founded' }));
		})
})

module.exports = router;
const express = require('express');
const router = express.Router();

const stripe = require('stripe')("sk_test_51HyEe1LEvonedayHEiMi4A6JjABjoi2H7TTTy4mvFkzINGdQ4aD3WM8HAPDJGO7IBz7SwzhpH3BVKI8w554jrjWF00zHr7ZYNr");

router.post('/payment', function(req, res, next){
    console.log("in payment js");
    stripe.charges.create({
        amount: req.body.amount,
        currency: 'INR',
        descriptionn: 'Booking fee',
        source: req.body.token.id,
    }, (err, charge) => {
        if(err){
            next(err);
        }
        res.json({success:true, status:"Payments Successful"})
    })
    console.log(req.body);
    next();
});

module.exports = router;
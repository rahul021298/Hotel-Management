const express = require('express');
const router = express.Router();
const bookedController = require("../controllers/bookedController");

router.get('/', async function(req, res){
    res.json(await bookedController.getBookedRooms());
});

router.get('/current', async function(req, res){
    res.json(await bookedController.getCurrentBookedRooms());
});

router.post('/saveDetails', async function(req, res){
    await bookedController.insertBookedRooms(req.body);
    res.json({
        message:"success",
        user: req.body
    });
});

router.put('/:id', async function(req, res){
    res.json(await bookedController.updateBookedRooms(req.params.id, req.body) );
});

router.delete('/:id', async function(req, res){
    res.json(await bookedController.deleteBookedRooms(req.params.id))
});

module.exports = router;
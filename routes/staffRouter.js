const express = require('express');
const router = express.Router();
const staffController = require("../controllers/staffController");

router.get('/', async function(req, res){
    res.json(await staffController.getStaff());
});

router.post('/saveDetails', async function(req, res){
    await staffController.insertStaff(req.body);
    res.json({
        message:"success",
        user: req.body
    });
});

router.put('/:id', async function(req, res){
    res.json(await staffController.updateStaff(req.params.id, req.body) );
});

router.delete('/:id', async function(req, res){
    res.json(await staffController.deleteStaff(req.params.id));
});

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require("./../controllers/userController");

router.get('/', async function(req, res){
    res.json(await userController.getUsers());
});

router.post('/saveDetails', async function(req, res){
    await userController.insertUsers(req.body);
    res.json({
        message:"success",
        user: req.body
    });
});

router.put('/:id', async function(req, res){
    res.json(await userController.updateUsers(req.params.id, req.body) );
 });

router.delete('/:id', async function(req, res){
    res.json(await userController.deleteUsers(req.params.id))
});

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

/**
* @swagger
* /users/signup:
*   post:
*       summary:
*       description: Use to signup user
*       responses:
*           200:
*               description: Inserted
*           404:
*               description: 404 Not Found
*/
router.post('/signup', authController.signup);

/**
* @swagger
* /users/login:
*   post:
*       summary:
*       description: Use to login user
*       responses:
*           200:
*               description: Inserted
*           404:
*               description: 404 Not Found
*/
router.post('/login', authController.login);

/**
* @swagger
* /users/getAll:
*   get:
*       description: get users
*       responses:
*           200:
*               description: Succcess
*           404:
*               description: 404 Not Found
*/
router.get('/getAll', async function(req, res){
    res.json(await userController.getUsers());
});

/**
* @swagger
* /users/saveDetails:
*   post:
*       summary:
*       description: Use to insert user
*       responses:
*           200:
*               description: Inserted
*           404:
*               description: 404 Not Found
*/

router.post('/saveDetails', async function(req, res){
    await userController.insertUsers(req.body);
    res.json({
        message:"success",
        user: req.body
    });
});


/**
* @swagger
* /users/:id:
*   put:
*       summary:
*       description: Use to update user
*       responses:
*           200:
*               description: Updated
*           404:
*               description: 404 Not Found
*/


router.put('/:id', async function(req, res){
    res.json(await userController.updateUsers(req.params.id, req.body) );
 });


 /**
* @swagger
* /users/:id:
*   delete:
*       summary:
*       description: Use to delete user
*       responses:
*           200:
*               description: Deleted
*           404:
*               description: 404 Not Found
*/
router.delete('/:id', async function(req, res){
    res.json(await userController.deleteUsers(req.params.id))
});
module.exports = router;
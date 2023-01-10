const express = require('express');
const router = express.Router();
const controller = require('../controller/controller')

// Home page route
router.get('/', controller.home);

// Route to find the user from the db
router.post('/', controller.find);

// Route to add a new user to the db
router.get('/adduser', controller.newuser);
router.post('/addnewuser', controller.addnewuser);

// Route to edit the user data
router.get('/edituser/:id', controller.edituser);
router.post('/updateuser/:id', controller.updateuser);

// Route to view the user record
router.get('/viewuser/:id', controller.viewuser);

// Route to delete the user
router.get('/deleteuser/:id', controller.deleteuser);


module.exports = router
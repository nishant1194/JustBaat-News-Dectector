const express = require('express');
const { getUser,registerUser, loginUser} = require('../controllers/AuthController.js');

const router = express.Router();

router.get('/getUser', getUser); // User Registration
router.post('/register', registerUser); // User Registration
router.post('/login', loginUser); // User Login


module.exports = router;

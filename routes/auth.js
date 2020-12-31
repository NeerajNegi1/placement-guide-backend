const express = require('express');
const router = express.Router();

const {register , login, getUsers, deleteUser} = require('../controllers/auth')

router.post('/register', register);
router.post('/login', login);
router.get('/all-users', getUsers)
router.post('/delete-users', deleteUser)


module.exports = router;
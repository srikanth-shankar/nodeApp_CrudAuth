const express = require('express');
const router = express.Router();

const usersCtrlr = require('../controllers/users-controller');

router.get('/', usersCtrlr.getUsers);
router.post('/signup', usersCtrlr.signup);
router.post('/login', usersCtrlr.login);

module.exports = router;
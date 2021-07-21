const express = require('express');
const router = express.Router();
const {getMe} = require('../controller/me');

//get student  home page
router.get('/me', getMe);

module.exports = router;

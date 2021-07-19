const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth');
const {getHome,getDashboard} = require('../controller/home');
const { postEmail} = require('../controller/email');

//get student  home page
router.get('/', ensureGuest, getHome);

//email student inquiry
router.post('/email', postEmail); 

//dashboard page
router.get('/dashboard',ensureAuth, getDashboard);

module.exports = router;

const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth');
const {check} = require('express-validator');
const {getHome,getDashboard} = require('../controller/home');
const { postEmail} = require('../controller/email');

//get student  home page
router.get('/', ensureGuest, getHome);

//email student inquiry
router.post('/email', check('email').isEmail().withMessage('Please Enter your valid Email address'), postEmail); 

//dashboard page
router.get('/dashboard',ensureAuth, getDashboard);

module.exports = router;

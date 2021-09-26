const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth');
const {check, body} = require('express-validator');
const {getHome,getDashboard} = require('../controller/home');
const { postEmail} = require('../controller/email');

//get student  home page
router.get('/', ensureGuest, getHome);

//email student inquiry
router.post('/email', 
    check('email')
    .isEmail()
    .withMessage('Please Enter your valid Email address'), 
    
    body('phone')  //check validation for phone number 
    .isLength({max: 11}) 
    .withMessage('Phone Number 12 Maximum number only'),

    body('message', 'Concern must Text only and min of 10 and max of 50 message') //concern validation
    .isLength({min: 10, max: 50})
    .isAlphanumeric(),

    postEmail); 

//dashboard page
router.get('/dashboard',ensureAuth, getDashboard);

module.exports = router;

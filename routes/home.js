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
    
    body('phone', 'Phone Number 11 Maximum number only')  //check validation for phone number 
    .isLength({max: 11})
    .isAlphanumeric(),

    // body('message', 'Concern must is Alphanumeric') //concern validation
    // .isAlphanumeric(),

    body('subject', 'Subject atleast 5 character long') //concern validation
    .isLength({max: 10})
    .isAlphanumeric(),

    body('name', 'Short name or Nickname must 5 character long') //concern validation
    .isLength({max: 10})
    .isAlphanumeric(),

    postEmail); 

//dashboard page
router.get('/dashboard',ensureAuth, getDashboard);

module.exports = router;

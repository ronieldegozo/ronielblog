const express = require('express');
const router = express.Router();
const passport = require('passport');

//get google
router.get('/google', passport.authenticate('google',{scope: ['profile'] }));

// google auth call back to dashboard
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}), (req, res) => {
    res.redirect('/dashboard');
});


// logout user
router.get('/logout', (req, res)=> {
    req.logout();
    res.redirect('/');
})

module.exports = router;

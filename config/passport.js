const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../model/User');


module.exports = (pasport) =>{
    passport.use(new GoogleStrategy ({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, 
    async (accessToken, refreshToken, profile, done) => {

      //new user successfully register
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
      }
      
      try {
        let user = await User.findOne({ googleId: profile.id })

        if(user){ // if user is exist
          done(null, user)
        }else{ //if there is no user create one
          user = await User.create(newUser)
          done(null, user);
        }
      }catch(err){
        console.log(err);
      }

    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
      })
      
}
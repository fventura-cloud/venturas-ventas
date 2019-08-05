const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User= require('../models/User');

//AUTHENTICATION
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async function(email, password, done) {          //done(error, findOK or data given, message)
    const user = await User.findOne({email: email});  // null=no error * false=no data
    if(!user) {
        return done(null, false, {message: 'Not User found'});
    } else {
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user);  
        } else {
            return done(null, false, {message: 'Incorrect Password'});
        }
    }
}));

//SAVING USER IN A SESSION
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//USING THE USER
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
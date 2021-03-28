const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model')

passport.serializeUser((user,done)=>{//takes user object stuff in cookie and sends to browser
    done(null,user.id);
});

//taking id from user when browser sends back the cookie
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
});


passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken,refreshToken,profile,done) => {
        // passport callback function
        //check if user already exists
        User.findOne({googleID:profile.id}).then((currentUser)=>{
            if(currentUser){
                //already have the user
                // console.log(profile); 
                done(null,currentUser) // currUser passed to serializeUser fn

            }
            else{
                //if not, create in our db
                new User({
                    username:profile.displayName,
                    googleID: profile.id, 
                    thumbnail: profile._json.picture,
                }).save().then((newUser)=>{ 
                    console.log(newUser.thumbnail);  
                    done(null,newUser);   
                })        
        
            }
        })
    })  
);  
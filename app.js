const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const express = require('express');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport')

//set up view
app.set('view engine', 'ejs');

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to mongo db');
})

//encrypt the cookie passed from serialize fn and send to browser
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,       //day in ms
    keys:[keys.session.cookieKey],
}))


//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//setup routes

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

//route fr home page
app.get('/', (req, res) => {
    res.render('home',{user:req.user});

}) 

app.listen(3000, () => {
    console.log("app now listening for requests on port 3000");
})


const router = require('express').Router();
const authCheck = (req,res,next)=>{//middleware type
    if(!req.user)
    {
        req.redirect('/auth/login');
    }
    else{
        next();
    }

};
router.get('/',authCheck,(req,res)=>{
    res.render('profile',{theuser:req.user});
    res.send("you are logged in this is your profile"+req.user.username);
})
module.exports = router;
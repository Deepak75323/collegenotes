const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment.js');
const admin=env.admin;
console.log(admin);
// tell passport to use a new strategy for google login


passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_call_back_url,
},
function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in google strategy-passport', err); return;}
            

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                    isAdmin: admin.includes(profile.emails[0].value)

                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}
                
                    return done(null, user);
                });
            }

        }); 
    }


));



passport.serializeUser(function(user,done)
{ console.log(user);
    done(null,user.id);
})









// deserializing the user from the key in the cookies


passport.deserializeUser(function(id,done)
{ 
        User.findById(id,function(err,user)
        { 
        if(err)
        { 
            console.log('error in finding user->passport');
            return done(err);
        }

        return done(null,user);

        });
});



// check if the user is authenticatd


passport.checkAuthentication=function(req,res,next)
{ 
    // if signin ,then passon the request to next func
    if(req.isAuthenticated())
    {
        return next();
    }

    return res.redirect('/signin');
}


passport.setAuthenticatedUser=function(req,res,next)
{ 

    if(req.isAuthenticated())
    { 
        // req.user conatains the current signed in user from the session cookie and we are sending it to locals
        res.locals.user=req.user;
    }
    next();
}


module.exports=passport;

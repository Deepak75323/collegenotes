const express=require('express');
require('dotenv').config();
const env=require('./config/environment.js');
console.log(env.session_cookie_key);
const app=express();
const path = require('path');
const cookieParser=require('cookie-parser');
const PORT=8000 || process.env.PORT;


const db=require('./config/mongoose');

const session=require('express-session');
const passport=require('passport');
const passportGoogle=require('./config/passport-google-oauth2-strategy');



const flash=require('connect-flash');
const customMware = require('./config/middleware');

const MongoStore=require('connect-mongo')(session);
const expressLayouts=require('express-ejs-layouts');
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }))
app.use(expressLayouts);


app.use(express.static(path.join(__dirname,'public')));

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// mongo store is used to store the session in the db
const sessionMiddleware=session({
    name:'blog',
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection:db,
        autoRemove: 'disabled'
      },
    function(err)
    { 
        console.log(err || "connect-mongo setup ok");
    }
    )

});

app.use(sessionMiddleware);







app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);




app.use('/',require('./routes'));

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});






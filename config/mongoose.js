const mongoose=require('mongoose');
const env = require('./environment');
console.log(env.db);
mongoose.connect(env.db,{useNewUrlParser:true,useUnifiedTopology:true});


const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB"));


db.once('open',function(){
    console.log("Connected to Database::MongoDB");
});



module.exports=db;
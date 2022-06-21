const mongoose = require('mongoose');

const resourceschema=new mongoose.Schema({
    books:
    { 

        type:String,
        required:true
    },
    bookslink:
    { 

        type:String,
        required:true
    },
    papersyear:
    { 

        type:String,
        required:true
    },
    paperslink:
    { 

        type:String,
        required:true
    },
    notes:
    {
        type:String,
        required:true
    },
    noteslink:
    {
        type:String,
        required:true
    },
    user:
    { 
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    subject:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subject'
    }
},
{ 
    timestamps:true
});



const  Resource=mongoose.model("Resource",resourceschema);
module.exports=Resource;
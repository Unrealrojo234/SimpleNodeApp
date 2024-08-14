const mongoose = require('mongoose');
const InfoSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Info = mongoose.model('Info',InfoSchema);
module.exports = Info

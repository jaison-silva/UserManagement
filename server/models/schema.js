import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
name: {type : String, required:true},
email: {type : String, required: true},
password : {type : String, required : true},
storageLocation : {type : String, required : false}
})

const User = mongoose.model("User",userSchema)

export {User}
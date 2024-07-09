// models/user.js

const mongoose = require('mongoose');

// user schema
const UserSchema=new mongoose.Schema({
  role:{
      type:String,
      enum:["user","admin"],
      default: 'user'
  },
 
  firstName:{
      type:String,
      
  },

  lastName:{
      type:String,
      
  },

  email:{
      type:String,
      required:true,
      unique:true
  },
  
  date:{
      type:Date,
      default:Date.now
  },

  password:{
      type:String,
    //   required:true
  }
      

})

const User =  mongoose.models.User ||  mongoose.model('UserModel',UserSchema);


module.exports = {User};

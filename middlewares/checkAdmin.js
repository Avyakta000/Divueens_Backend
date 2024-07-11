const { User } = require("../models/user");

// using this because at the time of login user doesn't not have a token
// also we can use this middle just to check wheather admin or not

const checkAdmin = async (req, res, next) => {
    const { email} = req.body;
    const user = await User.findOne({ email });
    // if(!user) return res.send(404).json({message: "signup to continue"})
    if (user && user.role !== 'admin') {
      console.log('ERROR RESTRICTION');
      
      return res.status(403).json({message: "You are not authorized !!",role: user.role})
  
    }
    next();
  };
  
  module.exports = checkAdmin;
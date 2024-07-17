// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

// local controllers
const signUp = async (req, res) => {

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
      return res.status(403).json({ message: 'User already exists' });
  }
  

  try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({ email, password: hashedPassword });
      const user = await newUser.save();

      // for now no other signups can be accepted so we wont provide authTokens
      const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      
      return res.status(201).json({ message: 'user registered successfully', authToken, user });
      // uncomment the above statement for accepting newSignups and remove the statement below
      // return res.status(201).json({ message: 'User registered successfully',  user });

  } catch (error) {
      return res.status(500).json({ error: error.message });
  }

}

const login =  async (req, res) => {

  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
  

      if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  
      // incase of no password field (user might have logged in via google)
      if(!user.password) return res.status(400).json({ message: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
    
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' });
      return res.json({ message: "login successful", authToken,user });
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
}

const adminProfile = async(req, res) => {
   try{
       
        
        const admin = await User.findOne({_id: req.user_id})
        console.log(admin,'admin')
        return res.json(admin)
   }catch(err){
          return res.json({message: err})
   }
}


module.exports = {
  signUp,
  login,
  adminProfile,
}



// // google controllers
// exports.login = (req, res) => {
//     res.redirect('/auth/google');
//   };
  
// exports.logout = (req, res) => {
//     req.logout((err) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       res.redirect('/');
//     });
//   };
  

  
// exports.isAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect('/login');
//   };
  
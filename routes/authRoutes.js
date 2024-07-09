const express = require('express');
const passport = require('passport');
const authMiddleware = require('../middlewares/authMiddleware')
const jwt = require('jsonwebtoken');

const {signUp, login, adminProfile} = require('../controllers/authController');

const router = express.Router();

// Local authentication routes

router.post('/signup',signUp)
router.post('/login',login)
router.get('/admin-profile',authMiddleware,adminProfile)



// Google authentication routes

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {session: false}),
  (req, res) => {
   
    const token = jwt.sign({ id: req.user._id},process.env.JWT_SECRET)
  
      res.redirect(`http://localhost:5173?token=${token}`); // redirect to a profile page or another route on client
  }
);




module.exports = router

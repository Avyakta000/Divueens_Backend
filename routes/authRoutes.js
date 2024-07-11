const express = require('express');
const passport = require('passport');
const authMiddleware = require('../middlewares/authMiddleware')
const jwt = require('jsonwebtoken');

const {signUp, login, adminProfile} = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');
const checkAdmin = require('../middlewares/checkAdmin');

const router = express.Router();

// Local authentication routes

router.post('/signup',signUp)
router.post('/login',checkAdmin, login)

router.get('/admin-profile',authMiddleware,adminProfile)

router.get('/verify-token',verifyToken, (req, res) => {
  return res.json({ message: 'This is a protected route', user: req.user });
})



// Google authentication routes

router.get('/google',
  passport.authenticate('google', { session: false, scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {session: false}),
  (req, res) => {
   
    const token = jwt.sign({ id: req.user._id},process.env.JWT_SECRET)
      console.log(token,'token server')
      res.redirect(`${process.env.CLIENT_URL}/login?token=${token}`); // redirect to a profile page or another route on client
  }
);




module.exports = router

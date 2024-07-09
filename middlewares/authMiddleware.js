const jwt = require('jsonwebtoken');
const { User } = require('../models/user');



const auth = async (req, res, next) => {
    const token = req.header('auth-token')
    // Get the token from the Authorization header ( in case we want to include Authorization headers )
    // const token = req.header('Authorization')?.split(' ')[1];

    console.log('token', token)
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    try {

        const data = jwt.verify(token, process.env.JWT_SECRET)
       
        const user = await User.findById({_id:data.id});
       
        if (user.role != "admin") {

            console.log('ERROR RESTRICTION')
            // const error = new customError("you do not have the permission to do that")
            // next(error)
            return res.status(400).json({ error: "you do not have the permission since you are not an admin" })
        }
        console.log('ERROR RESTRICTION passed....')
        next()
    } catch (error) {
        console.error('JWT verification error:', error);
        if (error.name === 'JsonWebTokenError') {
            // Handle token errors such as expired token or invalid token
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Server error' });
    }
}




module.exports = auth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {User} = require("../models/user");


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
            console.log('Existing user found:', user);
            done(null, user);
        } else {
            // Create a new user if not found
            const newUser = new User({
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
            });

            await newUser.save();
            console.log('New user created:', newUser);
            done(null, newUser);
        }
    } catch (error) {
        console.error('Error in Google OAuth:', error);
        done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(error => {
            done(error, null);
        });
});










// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK_URL,
// }, async (accessToken, refreshToken, profile, done) => {
//     User.findOne({ email: profile.emails[0].value }).then((currentUser) => {
//         if (currentUser) {
//             console.log('current user', currentUser, profile)
//             done(null, currentUser)
//         }
//         else {

//             new User({
//                 firstName: profile.name.givenName,
//                 lastName: profile.name.familyName,
//                 email: profile.emails[0].value,
//             }).save().then((newUser) => {
               
//                 done(null, newUser)
//             });
//         }
//     })

    
// }));


// passport.serializeUser( (user, done)=> {
//     console.log(user._id,'extracting user id')
//     done(null, user._id)  
// });

// passport.deserializeUser( (id, done)=> {

//     User.findById(id).then((user)=>{
//         done(null, user)
//     })
   
// });
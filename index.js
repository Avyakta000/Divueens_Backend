const express = require('express'); 

// for different domains accessing the server
const cors = require('cors');
const path = require('path');

const dotenv = require('dotenv')
// initializing environment variables
dotenv.config()

//db
const {connectDB} = require('./config/db');


// Initialize the app
const app = express();

//Middlewares

// Parse application/json
app.use(express.json());
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// enabling CORS for some specific origins only. 
const corsOptions = {
    origin: [process.env.CLIENT_URL, process.env.DIVUEENS_URL],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  
  };


 

   
app.use(cors(corsOptions)); // Allowing cross-origin requests on api's

// for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// initializing sessions
require('./config/passport');





// connecting to mongodbAtlas database 
connectDB()

//define all your routes below...............................check here
const userRoutes = require('./routes/authRoutes.js')
const productRoutes = require('./routes/productRoutes.js')


app.use("/auth/",userRoutes)
app.use("/api/",productRoutes)

//define all your routes above...............................check here

app.get("/",(req, res)=>{
    res.json({message:"message"})
})




app.listen(process.env.PORT, () => {
    // console.log(process.env.JWT_SECRET, process.env.PORT)
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});


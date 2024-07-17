const express = require('express');
const router = express.Router();
const {getSingleProduct, getProducts, uploadProduct, updateProduct, deleteProduct, queryProductsByName} = require('../controllers/productControllers')
const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../config/multerConfig'); 
// const multer = require('../middlewares/multer')  instead of this upload has been used above


// Himanshu -> specific end points for products
router.get('/products',getProducts)
router.get('/product/:_id',getSingleProduct)
router.post('/products',authMiddleware,upload.single('image'),uploadProduct)
router.put('/products/:_id',authMiddleware,upload.single('image'),updateProduct)
router.delete('/delete/:id',authMiddleware,deleteProduct)

// Akash Singh=>  Added productname search route
router.get('/search/:productname', queryProductsByName);




module.exports = router

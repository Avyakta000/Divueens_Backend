const express = require('express');
const router = express.Router();
const {getSingleProduct, getProducts, uploadProduct, updateProduct, deleteProduct, queryProductsByName} = require('../controllers/productControllers')
const authMiddleware = require('../middlewares/authMiddleware')
const multer = require('../middlewares/multer')

router.get('/products',getProducts)
router.get('/product/:_id',getSingleProduct)

// authMiddleware
// multer.single('image')
router.post('/products',uploadProduct)


router.put('/products/:_id',authMiddleware,multer.single('image'),updateProduct)
router.delete('/delete/:id',authMiddleware,deleteProduct)

// Akash Singh=>  Added productname search route
router.get('/search/:productname', queryProductsByName);

module.exports = router

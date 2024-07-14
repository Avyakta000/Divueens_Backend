const express = require('express');
const router = express.Router();
const {getSingleProduct, getProducts, uploadProduct, updateProduct, deleteProduct} = require('../controllers/productControllers')
const authMiddleware = require('../middlewares/authMiddleware')
const multer = require('../middlewares/multer')

const upload = require('../config/multerConfig'); 

router.get('/products',getProducts)
router.get('/product/:_id',getSingleProduct)


router.post('/products',authMiddleware,upload.single('image'),uploadProduct)


router.put('/products/:_id',authMiddleware,upload.single('image'),updateProduct)
router.delete('/delete/:id',authMiddleware,deleteProduct)

module.exports = router

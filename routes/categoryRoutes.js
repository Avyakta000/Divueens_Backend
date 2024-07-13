const express = require('express')
const {createCategory , deleteCategory, getAllCategories , getProductsByCategory} = require('../controllers/categoriesController')
const router= express.Router();

router.post('/categories', createCategory);

router.post('/categories/:id/delete', deleteCategory);

router.get('/categories', getAllCategories);

router.get('/categories/:number/products', getProductsByCategory);


module.exports = router;
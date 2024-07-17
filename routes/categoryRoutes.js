const express = require('express')
const {createCategory , deleteCategory, getAllCategories , getProductsByCategory} = require('../controllers/categoriesController')
const router= express.Router();

router.post('/categories', createCategory);

router.delete('/categories/:id/delete', deleteCategory);

router.get('/categories', getAllCategories);

router.get('/categories/:name/products', getProductsByCategory);


module.exports = router;
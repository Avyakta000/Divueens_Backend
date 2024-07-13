const Category = require('../models/category');
const {Product} = require('../models/product');

const createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params.id;
        const deleteCategory = await Category.findByIdAndDelete(id);
        res.json(deleteCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const categoryNumber = req.params.number;
        console.log(`Category Number: ${categoryNumber}`);
    
        const category = await Category.findOne({ categoryNumber });
        console.log(`Category found: ${category}`);
    
        if (category) {
          const products = await Product.find({ category: category._id });
          console.log(`Products found: ${products}`);
          res.status(200).json(products);
        } else {
          res.status(200).json({ message: "Category does not exist or no products by this category" });
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: error.message });
      }
    };


module.exports = {

    createCategory,

    deleteCategory,

    getAllCategories,
    
    getProductsByCategory

}

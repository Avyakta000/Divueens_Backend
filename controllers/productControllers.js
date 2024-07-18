const {Product} = require('../models/product')
const Category = require('../models/category');
// const path = require('path');                  
// const fs = require('fs').promises;   fs is not needed anymore 
const { DeleteObjectCommand,  } = require('@aws-sdk/client-s3');
const s3Client = require('../config/awsConfig');


const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        console.log(products, '/getproducts')
        return res.json(products);
        // console.log(resp, "response")
    } catch {
        return res.json({ error: "error occured" })
    }

};


const getSingleProduct =  async (req, res) => {
    const { _id } = req.params;
    try {
        const item = await Product.findById(_id);
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const uploadProduct =  async (req, res) => {

    try{
        const { name, price, description, category } = req.body;
        const imageUrl = req.file.location;
        const newProduct = new Product({ name, price, description, category, imageUrl });
        await newProduct.save();
        return res.json(newProduct);

    }catch(err){
        res.json({error: err.message})
    }
        
};


const updateProduct = async (req, res) => {

    try {
        const product = await Product.findById(req.params._id);
        const { name, price, description, category } = req.body;
        // change here (category added above and below )
        let updatedFields = {name, price, description, category}
       
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
    
        if (req.file) {
          if (product.imageUrl) {
            const oldKey = product.imageUrl.split('/').pop();
            const deleteParams = {
              Bucket: process.env.S3_BUCKET_NAME,
              Key: oldKey,
            };
            await s3Client.send(new DeleteObjectCommand(deleteParams));
          }
          updatedFields.imageUrl = req.file.location;
        }
        
        const updatedProduct = await Product.findByIdAndUpdate(req.params._id, updatedFields , { new: true });
      
        res.json(updatedProduct);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}


const deleteProduct = async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        
        if (product.imageUrl) {
         
          const key = product.imageUrl.split('/').pop();
          const deleteParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
          };
          await s3Client.send(new DeleteObjectCommand(deleteParams));
        }
        
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      
        return res.json({ message: "Product deleted", deletedProduct });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};


// akash query products using name
const queryProductsByName = async (req, res) => {
    try {
        const name = req.params.productname;
      const products = await Product.find({ name: new RegExp(name, 'i') });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



module.exports = {
    getSingleProduct, 

    getProducts,

    uploadProduct,

    updateProduct,

    deleteProduct,

    queryProductsByName,
}
const {Product} = require('../models/product')
const path = require('path');
const fs = require('fs').promises;


const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        console.log(products, '/getproducts')
        const resp = res.json(products);
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
        console.log(req.body, "request .....................................")
        const { name, price, description, } = req.body;
        const fileName = req.file.filename;
        const imageUrl = `http://localhost:${process.env.PORT}/uploads/${fileName}`
        const newProduct = new Product({ name, price, description, imageUrl });
        await newProduct.save();
        const resp = res.json(newProduct);

    }catch(err){
        res.json({error: err.message})
    }
        
};
    
const updateProduct =  async (req, res) => {

    try {
        const { _id } = req.params;
        const { name, price, description } = req.body;
        let updatedFields = {name, price, description}
        
        console.log(name,price,description,'payloads')
        if(req.file){
            let newImageUrl = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`
            updatedFields.imageUrl = newImageUrl
        }

        const existingItem = await Product.findById(_id)

        if (req.file && existingItem.imageUrl) {
        const filename = path.basename(existingItem.imageUrl);
        const imagePath = path.join(__dirname, '/uploads', filename);
        await deleteFile(imagePath);

        }

        const updatedProduct = await Product.findByIdAndUpdate(_id, updatedFields , { new: true });
        res.json(updatedProduct);

    } catch (error) {
        res.status(500).json(error)
    }
};

const deleteProduct = async (req, res) => {

    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndDelete(id);
        res.json(updatedProduct);

    } catch (error) {

        return res.json({ error })

    }
};


// Akash Singh=>  ADD
//Functionn for Search Product by name  ->   
const queryProductsByName = async (req, res) => {
    try {
        const name = req.params.productname;
      const products = await Product.find({ name: new RegExp(name, 'i') });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Function to delete a file asynchronously (helper function)
async function deleteFile(filePath) {
    try {
        await fs.unlink(filePath);
        console.log(`Deleted file: ${filePath}`);
    } catch (error) {
        console.error(`Error deleting file: ${filePath}`, error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}
  


module.exports = {
    getSingleProduct, 

    getProducts,

    uploadProduct,

    updateProduct,

    deleteProduct,
    
// Akash Singh=>  ADD
    queryProductsByName
}

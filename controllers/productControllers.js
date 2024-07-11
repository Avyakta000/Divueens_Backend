const {Product} = require('../models/product')
const path = require('path');
const fs = require('fs').promises;


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
            let newImageUrl = `${process.env.API_DOMAIN}/uploads/${req.file.filename}`
            updatedFields.imageUrl = newImageUrl

            const existingItem = await Product.findById(_id)
            console.log('image', req.file.filename)
            console.log('updated fields', updatedFields)
            if (req.file && existingItem.imageUrl) {
            const filename = path.basename(existingItem.imageUrl);
            const imagePath = path.join(__dirname,'..', '/uploads', filename);
            console.log('old image path updating', imagePath,__dirname)
            await deleteFile(imagePath);
    
            }
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
        const existingItem = await Product.findByIdAndDelete(id);

        if (existingItem.imageUrl) {
            const filename = path.basename(existingItem.imageUrl);
            const imagePath = path.join(__dirname,'..', '/uploads', filename);
            console.log('image path deleting', imagePath,__dirname)
            await deleteFile(imagePath);
        }
        res.json(existingItem);

    } catch (error) {

        return res.json({ error })

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

    deleteProduct
}
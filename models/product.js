const mongoose = require('mongoose');

// product schema

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
});

const Product = mongoose.model('ProductModel', productSchema);



module.exports ={ Product
}
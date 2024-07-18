const mongoose = require('mongoose');

// product schema

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // required: true       
        // for later uncomment above, (to ensure  that product schema doesn't throw any error)
      }
});

const Product = mongoose.model('ProductModel', productSchema);



module.exports ={ Product
}
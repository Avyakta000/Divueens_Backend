const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false
  },
  categoryNumber: {
    type: Number,
    required: true,
    unique: true
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;


// {
//   "name":"typ1",
//   "description":"regular",
//   "categoryNumber":"1"
// }
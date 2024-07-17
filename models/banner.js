const mongoose = require('mongoose');
const { Schema } = mongoose;

const bannerSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
//   linkUrl: {
//     type: String,
//   },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// middleware to update the `updatedAt` field on save
bannerSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
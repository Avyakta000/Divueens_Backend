const mongoose = require('mongoose');
// mongodb://localhost:27017/admin_dashboard
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://html78910:4o7wOi9p5WozRsuf@clusterdivueens.xlx6u6l.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDivueens');
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = {connectDB};

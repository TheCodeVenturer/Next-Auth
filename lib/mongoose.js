import mongoose from "mongoose"

const connectDb = async (req,res) => {
  if (mongoose.connections[0].readyState) return 
  await mongoose.connect(process.env.MONGODB_URI);
};

export default connectDb

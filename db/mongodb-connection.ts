import mongoose from 'mongoose';
const uri = process.env.MONGO_URL;

export const connectToMongo = async () => {
    
	await mongoose.connect(uri!);
};

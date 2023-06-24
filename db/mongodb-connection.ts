import mongoose from 'mongoose';
const uri = "mongodb+srv://raslan:EuvEjwXomvASj812@cluster0.yne75mu.mongodb.net/nodejs?retryWrites=true&w=majority";

export const connectToMongo = async () => {
    
	await mongoose.connect(uri);
};

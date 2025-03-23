import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;


export const connectDB = async()=>{
    try {
        if( mongoose.connection.readyState === 1){
            console.log("MongoDB already connected");
            return;
        }
    } catch (error) {
        console.error("mongoDB connection error:", error);
        process.exit(1);
    }
};
import mongoose from "mongoose";
import "dotenv/config";

export default async function connectToDB(){
    try {
            await mongoose.connect(process.env.DB_URL || "")
    } catch (error) {
        console.log("/////////////////////cant connect to db//////////////////////////")
        console.log(error)
    }
}
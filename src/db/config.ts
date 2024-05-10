import mongoose from "mongoose";
import 'dotenv/config'
async function ConnectDB() {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("DB connection string missing.")
        }
        
        mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log("DB connected")
        })

    } catch (err) {
        console.log(err);
    }
}

export default ConnectDB
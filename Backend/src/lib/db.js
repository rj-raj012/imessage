import mongoose from "mongoose";
import dns from "dns";

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

export async function connectDB() {
    try {
        const mongoUri = process.env.MONGO_URI?.trim();

        if (!mongoUri) {
            throw new Error("MONGO_URI is required in .env file")
        }

        const conn = await mongoose.connect(mongoUri)
        console.log("✅ MongoDB connected successfully",conn.connection.host);
    
    } catch (err) {
        console.error( err);
        process.exit(1);
    }
}
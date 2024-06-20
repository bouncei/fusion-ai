import mongoose, { Mongoose } from "mongoose";


interface MongooseConn {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

const MONGODB_URI: string = process.env.MONGODB_URI!

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your MONGODB_URI to .env");
}

let cached: MongooseConn = (global as any).mongoose


if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null
    }
}


export const connect = async () => {
    if (cached.conn) return cached.conn


    cached.promise = cached.promise ||
        mongoose.connect(MONGODB_URI, {
            dbName: "fusion-ai",
            bufferCommands: false,
            connectTimeoutMS: 30000

        })
}
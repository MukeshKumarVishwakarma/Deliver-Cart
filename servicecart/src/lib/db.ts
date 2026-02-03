import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URL as string

if (!mongodbUrl) {
    throw new Error("Please define the MONGODB_URL environment variable.")
}

let cached = global.mongoose
if(!cached){
    cached = global.mongoose = {conn:null, promise:null}
}

const connectDb = async () => {
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        cached.promise = mongoose.connect(mongodbUrl).then((conn) =>conn.connection)
    }
    try {
        const conn = await cached.promise
        return conn
    } catch (error) {
        console.log(error)
    }
}

export default connectDb
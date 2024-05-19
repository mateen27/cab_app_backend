import mongoose from 'mongoose';

// database connectivity
const connectDatabase = async ( ) => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI!);

        console.log(`Connected to the MongoDB: ${connection}, ${connection.connection.host}`);
    } catch( error ) {
        console.error(`Error Connecting to the MongoDB: ${error}`);
        process.exit(1);
    }
}

export default connectDatabase;
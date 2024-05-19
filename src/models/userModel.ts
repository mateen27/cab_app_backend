import mongoose, { Schema, Document, mongo } from 'mongoose'

// defining the interface for User document
export interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
    phoneNumber: string;
    // address: string;
    createdAt: Date;
}

// user Schema 
const UserSchema: Schema = new Schema({
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;
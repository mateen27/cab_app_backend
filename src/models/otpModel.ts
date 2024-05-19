import mongoose, { Document, Schema } from 'mongoose';

interface Otp extends Document {
    phoneNumber: string;
    otp: string;
    createdAt: Date;
    expiresAt: Date;
}

const OtpSchema: Schema = new Schema<Otp>({
    phoneNumber: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1m', // Automatically remove the document after 1 minute
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 60 * 1000), // 1 minute from now
    },
});

OtpSchema.index({ phoneNumber: 1, otp: 1 }, { unique: true });

const OtpNumber = mongoose.model<Otp>('Otp', OtpSchema);

export default OtpNumber;

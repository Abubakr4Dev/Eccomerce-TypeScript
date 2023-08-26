import mongoose from 'mongoose';

export const connectDB = async (url: string) => {
    return mongoose.connect(url, {
        retryWrites: true,
        w: 'majority'
    });
};

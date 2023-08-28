import { Schema, model } from 'mongoose';
import { IProductDoc, IProductModel } from '../interfaces/product.interface';

const productSchema = new Schema<IProductDoc>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: [
        {
            src: { type: String, required: true }
        }
    ]
});

export const Product = model<IProductDoc, IProductModel>('Product', productSchema);

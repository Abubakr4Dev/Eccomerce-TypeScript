import { Schema, model } from 'mongoose';
import { ICartDoc, ICartModel } from '../interfaces/cart.interface';

const cartSchema = new Schema<ICartDoc>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'CartProduct'
        }
    ],
    totalPrice: { type: Number, default: 0, required: true }
});

export const Cart = model<ICartDoc, ICartModel>('Cart', cartSchema);

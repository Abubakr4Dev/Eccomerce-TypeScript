import { Schema, model } from 'mongoose';
import { ICartProductDoc, ICartProductModel } from '../interfaces/cart-product.interface';

const cartProductSchema = new Schema<ICartProductDoc>({
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: { type: Number, required: true }
});

export const CartProduct = model<ICartProductDoc, ICartProductModel>('CartProduct', cartProductSchema);

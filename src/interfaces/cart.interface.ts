import { Document, Model } from 'mongoose';
import { IUserDoc } from './user.interface';
import { ICartProductDoc } from './cart-product.interface';

export interface ICart {
    user: IUserDoc | string;
    products: Array<ICartProductDoc | string>;
    totalPrice: number;
}

export interface ICartDoc extends ICart, Document {}

export interface ICartModel extends Model<ICartDoc> {}

/** Cart DTOS */
export interface IAddProductToCart {
    userId: string;
    quantity: number;
    productId: string;
}

export interface ICreateCartProduct {
    cartId: string;
    quantity: number;
    productId: string;
}

export interface IRemoveProductFromCart {
    cartId: string;
    productId: string;
}

export interface IUpdateCartProductQuantity {
    cartId: string;
    productId: string;
    options: { inc: boolean; amount: number };
}

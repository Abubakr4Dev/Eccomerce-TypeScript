import { Document, Model } from 'mongoose';
import { ICartDoc } from './cart.interface';
import { IProductDoc } from './product.interface';

export interface ICartProduct {
    cart: ICartDoc | string;
    product: IProductDoc;
    quantity: number;
}

export interface ICartProductDoc extends ICartProduct, Document {}

export interface ICartProductModel extends Model<ICartProductDoc> {}

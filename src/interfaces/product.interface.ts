import { Document, Model } from 'mongoose';
import { IUserDoc } from './user.interface';
import { Request } from 'express';

export interface IProduct {
    user: IUserDoc | string;
    title: string;
    price: number;
    images: { src: string }[];
}

export interface IProductDoc extends IProduct, Document {}

export interface IProductModel extends Model<IProductDoc> {}

/**  Product DTOS */
export interface ICreateProduct {
    title: string;
    price: number;
    userId: string;
    files: Request['files'];
}

export interface IUpdateProduct {
    userId: string;
    title: string;
    price: number;
    productId: string;
}

export interface IDeleteProduct {
    productId: string;
    userId: string;
}

export interface IAddImages {
    productId: string;
    userId: string;
    files: Request['files'];
}

export interface IDeleteImages {
    productId: string;
    userId: string;
    imagesIds: Array<string>;
}

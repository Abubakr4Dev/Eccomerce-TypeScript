import { Document, Model } from 'mongoose';

export interface IUser {
    email: string;
    password: string;
}

export interface IUserDoc extends IUser, Document {}

export interface IUserModel extends Model<IUserDoc> {}

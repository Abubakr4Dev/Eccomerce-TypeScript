import { IUser, IUserModel } from '../interfaces/user.interface';
import { User } from '../models/user.model';

export class UserService {
    constructor(public userModel: IUserModel) {}

    async create(newUser: IUser) {
        const user = new this.userModel({
            email: newUser.email,
            password: newUser.password
        });

        return await user.save();
    }

    async findOneByEmail(email: string) {
        return await this.userModel.findOne({ email });
    }
}

export const userService = new UserService(User);

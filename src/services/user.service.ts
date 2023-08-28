import { IUser, IUserModel } from '../interfaces/user.interface';
import { User } from '../models/user.model';

export class UserService {
    constructor(public userModel: IUserModel) {}

    async create(createUserDto: IUser) {
        const user = new this.userModel({
            email: createUserDto.email,
            password: createUserDto.password
        });

        return await user.save();
    }

    async findOneByEmail(email: string) {
        return await this.userModel.findOne({ email });
    }
}

export const userService = new UserService(User);

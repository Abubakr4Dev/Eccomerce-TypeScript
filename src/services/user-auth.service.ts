import { IUser } from '../interfaces/user.interface';
import { UserService, userService } from './user.service';
import { AuthenticationService } from './authentication.service';

export class AuthService {
    constructor(
        public userService: UserService,
        public authenticationService: AuthenticationService
    ) {}

    async signup(createUserDto: IUser) {
        const existingUser = await this.userService.findOneByEmail(createUserDto.email);
        if (existingUser) return { message: 'email is taken' };

        const newUser = await this.userService.create(createUserDto);

        const jwt = this.authenticationService.generateJwt({ email: createUserDto.email, userId: newUser.id }, process.env.JWT_KEY!);

        return { jwt };
    }

    async signin(signinUserDto: IUser) {
        const user = await this.userService.findOneByEmail(signinUserDto.email);
        if (!user) return { message: 'email is taken' };

        const samePwd = await this.authenticationService.pwdCompare(user.password, signinUserDto.password);

        if (!samePwd) return { message: 'wrong credentials' };

        const jwt = this.authenticationService.generateJwt({ email: user.email, userId: user.id }, process.env.JWT_KEY!);

        return { jwt };
    }
}

export const authSevice = new AuthService(userService, new AuthenticationService());

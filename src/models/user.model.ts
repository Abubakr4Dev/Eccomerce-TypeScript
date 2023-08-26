import { Schema, model } from 'mongoose';
import { IUserDoc, IUserModel } from '../interfaces/user.interface';
import { AuthenticationService } from '../services/authentication.service';

const userSchema: Schema<IUserDoc> = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
            }
        }
    }
);

userSchema.pre('save', async function (done) {
    const authenticationService = new AuthenticationService();
    if (this.isModified('password') || this.isNew) {
        const hashedPwd = await authenticationService.pwdToHash(this.get('password'));
        this.set('password', hashedPwd);
    }
    done();
});

export const User = model<IUserDoc, IUserModel>('User', userSchema);

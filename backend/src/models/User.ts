import { Schema, model, Document, Types } from 'mongoose';
import { userValidators } from "./User.Validator"

interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    phone: string;
    password: string;
    role: 'employee' | 'manager' | 'supermanager';
    createdAt: Date,
    updatedAt: Date,
    managerId?: Types.ObjectId | IUser;
    employees?: Types.ObjectId[] | IUser[];
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: userValidators.username.validator,
            message: userValidators.username.message,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: userValidators.email.validator,
            message: userValidators.email.message,
        },
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: userValidators.phone.validator,
            message: userValidators.phone.message,
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: userValidators.password.validator,
            message: userValidators.password.message,
        },
    },
    role: {
        type: String,
        lowercase: true,
        required: true,
        validate: {
            validator: userValidators.role.validator,
            message: userValidators.role.message
        }
    },
    managerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    employees: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: [],
        },
    ],
}, {
    timestamps: true,
});

const User = model<IUser>('User', UserSchema);

export { IUser, User };
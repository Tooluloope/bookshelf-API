import { BaseEntity } from 'typeorm';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    salt: string;
    fullname: string;
    phoneNumber: string;
    created_at: Date;
    updated_at: Date;
    validatePassword(password: string): Promise<boolean>;
}

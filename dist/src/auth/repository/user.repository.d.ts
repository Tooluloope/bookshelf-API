import { Repository } from 'typeorm';
import { User } from 'src/typeorm';
import { SignUpDTO } from '../dto/signup.dto';
import { SignInDTO } from '../dto/signin.dto';
import { JwtPayload } from '../types/JwtPayload.type';
export declare class UserRepository extends Repository<User> {
    signUp(signUpDTO: SignUpDTO): Promise<{
        message: string;
    }>;
    validateUser({ username, password }: SignInDTO): Promise<JwtPayload>;
    getUserInfoByUsername(username: string): Promise<User>;
    private hashPassword;
}

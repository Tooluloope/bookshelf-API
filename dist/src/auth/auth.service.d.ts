import { UserRepository } from './repository/user.repository';
import { SignUpDTO } from './dto/signup.dto';
import { SignInDTO } from './dto/signin.dto';
import { JwtPayload } from './types/JwtPayload.type';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/typeorm';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signUp(signUpDTO: SignUpDTO): Promise<{
        message: string;
    }>;
    signIn(signInDTO: SignInDTO): Promise<{
        accessToken: string;
        user: JwtPayload;
    }>;
    signOut(user: User): Promise<void>;
    getAccessToken(payload: JwtPayload): Promise<string>;
    getRefreshToken(payload: JwtPayload): Promise<string>;
}

import { SignUpDTO } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signin.dto';
import { JwtPayload } from './types/JwtPayload.type';
import { User } from 'src/typeorm';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin(signinDTO: SignInDTO): Promise<{
        accessToken: string;
        user: JwtPayload;
    }>;
    signup(signUpDTO: SignUpDTO): Promise<{
        message: string;
    }>;
    logout(user: User): void;
}

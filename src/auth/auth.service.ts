import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { SignUpDTO } from './dto/signup.dto';
import { SignInDTO } from './dto/signin.dto';
import { JwtPayload } from './types/JwtPayload.type';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/typeorm';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,

    private jwtService: JwtService,
  ) {}

  async signUp(signUpDTO: SignUpDTO): Promise<{ message: string }> {
    return this.userRepository.signUp(signUpDTO);
  }

  async signIn(
    signInDTO: SignInDTO,
  ): Promise<{ accessToken: string; user: JwtPayload }> {
    const user = await this.userRepository.validateUser(signInDTO);

    if (!user) throw new UnauthorizedException('Invalid Credentials');
    const accessToken = await this.getAccessToken(user);

    return {
      user,
      accessToken,
    };
  }

  async signOut(user: User) {
    return;
  }

  async getAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });
  }

  async getRefreshToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });
  }
}

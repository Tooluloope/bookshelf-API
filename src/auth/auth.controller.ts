import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { SignUpDTO } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signin.dto';
import { JwtPayload } from './types/JwtPayload.type';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/typeorm';
import { JWTAuthGuard } from './guards/AuthGuard';
import { GetUser } from './decorator/get-user-decorator';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  /**
   * POST /api/auth/signin
   * @param signinDTO
   * @returns
   */
  @Post('signin')
  signin(
    @Body(ValidationPipe) signinDTO: SignInDTO,
  ): Promise<{ accessToken: string; user: JwtPayload }> {
    return this.authService.signIn(signinDTO);
  }

  /**
   * POST /api/auth/signup
   * @param signUpDTO
   * @returns {Promise<{ message: string }>}
   */
  @Post('signup')
  signup(
    @Body(ValidationPipe) signUpDTO: SignUpDTO,
  ): Promise<{ message: string }> {
    return this.authService.signUp(signUpDTO);
  }

  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Get('/logout')
  /**
   * GET /api/auth/logout
   * @param user
   */
  @Get('logout')
  logout(@GetUser() user: User) {
    this.authService.signOut(user);
  }
}

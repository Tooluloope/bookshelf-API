import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/typeorm';
import { SignUpDTO } from '../dto/signup.dto';
import bcrypt from 'bcrypt';
import { SignInDTO } from '../dto/signin.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtPayload } from '../types/JwtPayload.type';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(signUpDTO: SignUpDTO): Promise<{
    message: string;
  }> {
    const { username, password, email, fullname, phoneNumber } = signUpDTO;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await this.hashPassword(password, salt);
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.salt = salt;
    user.email = email;
    user.fullname = fullname;
    user.phoneNumber = phoneNumber;

    try {
      await user.save();
      return { message: 'User successfully created !' };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUser({ username, password }: SignInDTO): Promise<JwtPayload> {
    const user = await this.findOne({
      where: [{ username }, { email: username }],
    });

    if (user && user.validatePassword(password)) {
      const { phoneNumber, email, fullname } = user;
      return {
        user: {
          username,
          phoneNumber,
          email,
          fullname,
        },
      };
    }
    return null;
  }

  getUserInfoByUsername(username: string): Promise<User> {
    return this.findOne({ username });
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}

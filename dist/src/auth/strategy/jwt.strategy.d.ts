import { Strategy } from 'passport-jwt';
import { User } from 'src/typeorm';
import { UserRepository } from '../repository/user.repository';
import { JwtPayload } from '../types/JwtPayload.type';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: JwtPayload): Promise<User>;
}
export {};

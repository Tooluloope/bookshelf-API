"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("../../typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const common_1 = require("@nestjs/common");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async signUp(signUpDTO) {
        const { username, password, email, fullname, phoneNumber } = signUpDTO;
        const salt = await bcrypt_1.default.genSalt();
        const hashedPassword = await this.hashPassword(password, salt);
        const user = new typeorm_2.User();
        user.username = username;
        user.password = hashedPassword;
        user.salt = salt;
        user.email = email;
        user.fullname = fullname;
        user.phoneNumber = phoneNumber;
        try {
            await user.save();
            return { message: 'User successfully created !' };
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('User already exists');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async validateUser({ username, password }) {
        const user = await this.findOne({
            where: [{ username }, { email: username }],
        });
        if (user && (await user.validatePassword(password))) {
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
    getUserInfoByUsername(username) {
        return this.findOne({ username });
    }
    async hashPassword(password, salt) {
        return bcrypt_1.default.hash(password, salt);
    }
};
UserRepository = __decorate([
    (0, typeorm_1.EntityRepository)(typeorm_2.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map
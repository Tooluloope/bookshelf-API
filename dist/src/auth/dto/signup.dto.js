"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SignUpDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 4, maximum: 20 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], SignUpDTO.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        minimum: 6,
        maximum: 30,
        description: 'At least 1 capital, 1 small, 1 special character & 1 number',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password too weak',
    }),
    __metadata("design:type", String)
], SignUpDTO.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignUpDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpDTO.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 11 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(11),
    __metadata("design:type", String)
], SignUpDTO.prototype, "phoneNumber", void 0);
exports.SignUpDTO = SignUpDTO;
//# sourceMappingURL=signup.dto.js.map
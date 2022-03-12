"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const config_2 = require("../config");
const auth_module_1 = require("./auth/auth.module");
let envFilePath = `${process.cwd()}/config/env/.env.development`;
console.log(`Running in ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === 'PRODUCTION') {
    envFilePath = '.env';
}
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath,
                load: [config_2.configuration],
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    return {
                        type: 'postgres',
                        host: configService.get('database.host'),
                        port: +configService.get('database.port'),
                        username: configService.get('database.user'),
                        password: configService.get('database.password'),
                        database: configService.get('database.name'),
                        entities: ['dist/**/*.entity{.ts,.js}'],
                        synchronize: true,
                    };
                },
            }),
            auth_module_1.AuthModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
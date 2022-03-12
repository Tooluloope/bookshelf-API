import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from 'config';
import { AuthModule } from './auth/auth.module';

let envFilePath = `${process.cwd()}/config/env/.env.development`;

console.log(`Running in ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === 'PRODUCTION') {
  envFilePath = '.env';
}
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
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
    AuthModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CreateUserService } from './services/create-user/create-user.service';
import { HashPasswordService } from './services/create-user/hash-password.service';
import { CheckEmailExistService } from './services/create-user/check-if-email-exist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { CheckPasswordService } from './services/log-in/check-password.service';
import { CheckUserExistService } from './services/log-in/check-user-exist.service';
import { GenerateTokenService } from './services/log-in/generate-token.service';
import { LogInService } from './services/log-in/login.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InsertRoleService, InserUserService } from './services/insert-init';
import { Role } from './entities/role.entity';
import { Participation } from '../participation/entities/participation.entity';
import { Tournament } from '../tournament/entities/tournament.entity';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Role, Participation, Tournament]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('TOKEN_EXPIRATION'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    CreateUserService,
    HashPasswordService,
    CheckEmailExistService,
    UserService,
    CheckPasswordService,
    CheckUserExistService,
    GenerateTokenService,
    LogInService,
    InserUserService,
    InsertRoleService,
    JwtStrategy,
  ],
  exports: [InserUserService, InsertRoleService],
})
export class AuthModule {}

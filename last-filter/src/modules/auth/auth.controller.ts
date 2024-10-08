import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { ApiPostOperation } from 'src/common/decorators/swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiPostOperation('Register', CreateUserDto, CreateUserDto, false)
  @Post('register')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }
  @ApiPostOperation('login', LoginDto, LoginDto, false)
  @Post('login')
  logIn(@Body() loginDto: LoginDto) {
    return this.authService.logIn(loginDto);
  }
}

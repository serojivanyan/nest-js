import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
import { User } from '../user/entities/user.entity.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200 })
  @Post('/login')
  async login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'User Registration' })
  @ApiResponse({ status: 200, type: String })
  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}

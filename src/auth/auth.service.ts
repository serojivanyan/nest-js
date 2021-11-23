import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity.js';
import { CreateUserDto } from 'src/user/dto/create-user.dto.js';
import { emitKeypressEvents } from 'readline';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(userDto) {
    const user = await this.validateUser(userDto);
    const token = await this.generateToken(user);
    return { result: { token } };
  }

  async registration(userDto) {
    const isExists = await this.userService.findUserByEmail(userDto.email);
    if (isExists) {
      throw new HttpException(
        'User with those email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 10);

    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });
    const token = await this.generateToken(user);

    return { result: token };
  }
  private async generateToken(user: User) {
    const { email, id, roles } = user;
    return this.jwtService.sign({ email, id, roles });
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.findUserByEmail(userDto.email);
    if (!user) {
      throw new HttpException(
        'User with those email doesnt exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isPasswordMatched = await bcrypt.compare(
      user.password,
      userDto.password,
    );
    if (!isPasswordMatched) {
      throw new UnauthorizedException({
        message: 'Incorrect email or password',
      });
    }
    return user;
  }
}

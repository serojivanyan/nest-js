import { Injectable, Version } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity.js';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return { result: user };
  }

  async findAll() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return { result: users };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findByPk(id);
    return { result: user };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<string> {
    return `This action updates a #${id} user`;

    // const deleteUser = await this.userRepository.destroy({ where: id });
    // return deleteUser;
  }
}

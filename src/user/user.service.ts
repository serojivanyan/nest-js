import { Injectable, Version } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity.js';
import { InjectModel } from '@nestjs/sequelize';
import { RoleService } from '../role/role.service.js';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    const role = await this.roleService.findByValue('user');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async findAll() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true, through: { attributes: [] } },
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  async findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email: email.trim().toLocaleLowerCase() },
    });
  }

  async remove(id: number): Promise<string> {
    return `This action updates a #${id} user`;

    // const deleteUser = await this.userRepository.destroy({ where: id });
    // return deleteUser;
  }
}

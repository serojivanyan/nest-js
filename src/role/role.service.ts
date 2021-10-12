import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './entities/role.entity.js';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const creationData = {
      ...createRoleDto,
      name: createRoleDto.name.trim().toLocaleLowerCase(),
    };
    const role = await this.roleRepository.create(creationData);
    return role;
  }

  async findAll() {
    const roles = await this.roleRepository.findAll();
    return roles;
  }

  // async findOne(id: number) {
  //   const role = await this.roleRepository.findByPk(id);
  //   console.log(role);
  //   return role;
  // }
  async findByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { name: value } });
    return role;
  }
  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}

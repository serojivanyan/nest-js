import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { CreateRoleDto } from 'src/role/dto/create-role.dto.js';
@Table({ tableName: 'roles' })
export class Role extends Model<Role, CreateRoleDto> {
  @ApiProperty({ example: 1, description: 'Role identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'admin', description: 'Role name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Admin role', description: 'Description of role' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
}

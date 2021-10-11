import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity.js';
import { Role } from './role.entity.js';
@Table({ tableName: 'user_roles', timestamps: false })
export class UserRole extends Model<UserRole> {
  @ApiProperty({ example: 1, description: 'Role identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'admin', description: 'Role name' })
  @ForeignKey(() => User)
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  userId: string;

  @ApiProperty({ example: 'Admin role', description: 'Description of role' })
  @ForeignKey(() => Role)
  @Column({ type: DataType.STRING, allowNull: false })
  roleId: string;
}

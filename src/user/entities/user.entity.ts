import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { CreateUserDto } from 'src/user/dto/create-user.dto.js';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../role/entities/role.entity.js';
import { UserRole } from '../../role/entities/user-role.entity.js';
@Table({ tableName: 'users' })
export class User extends Model<User, CreateUserDto> {
  @ApiProperty({ example: 1, description: 'User identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user@mail.com', description: 'User email address' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '1234567', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'John', description: 'First name of User' })
  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @ApiProperty({ example: 'Smith', description: 'Last name of User' })
  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}

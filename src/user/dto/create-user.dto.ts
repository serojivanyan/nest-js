import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.com', description: 'User email address' })
  readonly email: string;

  @ApiProperty({ example: 'John', description: 'First name of User' })
  readonly firstName: string;

  @ApiProperty({ example: 'Smith', description: 'Last name of User' })
  readonly lastName: string;

  @ApiProperty({ example: '1234567', description: 'User password' })
  readonly password: string;
}

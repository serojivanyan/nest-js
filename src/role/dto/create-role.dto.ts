import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'role admin' })
  readonly name: string;

  @ApiProperty({
    example: 'admin description',
    description: 'role  admin description',
  })
  readonly description: string;
}

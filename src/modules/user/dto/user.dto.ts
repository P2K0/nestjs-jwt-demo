import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'admin' })
  username: string;

  @ApiProperty({ example: '123456' })
  password: string;
}

import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength, Min, MIN_LENGTH } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateTransformer {

  @IsString()
  @Expose({name: 'user_name', toPlainOnly: true})
  @ApiProperty({name: 'userName'})
  userName: string;

  @IsEmail()
  @ApiProperty({name: 'email'})
  @Expose({name: 'email', toPlainOnly: true})
  email: string;

  @IsString()
  @Expose({name: 'password', toPlainOnly: true})
  @ApiProperty({name: 'password'})
  password: string

  @IsString()
  @Expose({name: 'confirm_password', toPlainOnly: true})
  @ApiProperty({name: 'confirmPassword'})
  confirmPassword: string

}

import { IsEmail, IsNotEmpty } from 'class-validator';

export class SetEmailDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly signature: string;
}

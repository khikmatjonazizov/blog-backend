import { SignInDto } from './sign-in.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto extends SignInDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;
}

import { IsString, IsEmail, IsStrongPassword } from 'class-validator';
export class CreateUserDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 3,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 3,
        minSymbols: 0,
    })
    password: string;
}
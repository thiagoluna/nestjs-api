import { IsString, IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 6,
        minSymbols: 0,
    })
    password: string;
}
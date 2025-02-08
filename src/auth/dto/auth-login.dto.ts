import { IsEmail, IsStrongPassword } from "class-validator";

export class AuthLoginDto {
    @IsEmail()
    email: string;
    
    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 3,
        minSymbols: 0
    })
    password: string;
}
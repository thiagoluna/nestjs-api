import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class AuthLoginDto {
    @IsEmail()
    email: string;
    
    @IsString()
    password: string;
}
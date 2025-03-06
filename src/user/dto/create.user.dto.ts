import { IsString, IsEmail, IsStrongPassword, IsOptional, isDateString, IsDateString, IsEnum } from 'class-validator';
import { Role } from 'src/enums/role.enum';

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

    @IsOptional()
    @IsDateString()
    birthdate: Date;

    @IsOptional()
    @IsEnum(Role)
    role: number;
}
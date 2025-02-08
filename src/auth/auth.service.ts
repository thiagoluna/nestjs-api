import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
    ) {
    }

    async createToken(user: User) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            },{
                expiresIn: '1h',
                subject: user.id.toString(),
                issuer: 'Login API',
                audience: 'users'
            })
        };
    }

    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                issuer: 'Login API',
                audience: 'users'
            });

            return data;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: email,
                password: password
            }
        });

        if (!user) {
            throw new UnauthorizedException("Email or Password not found");
        }

        return this.createToken(user);
    }

    async forgetPassword(email: string): Promise<boolean> {
        const user = await this.prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new UnauthorizedException("Email not found");
        }

        // TODO: Send email with reset password link

        return true;
    }

    async resetPassword(password: string, token: string) {
        // TODO : Check token is valid

        const id = 0;

        const user = await this.prisma.user.update({
            where: {
                id: id
            },
            data: {
                password: password
            }
        });

        return this.createToken(user);
    }

    async register(data: AuthRegisterDto) {
        const user = await this.userService.create(data);

        return this.createToken(user);
    }
}
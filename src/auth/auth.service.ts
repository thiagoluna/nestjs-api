import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
    
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) {
    }

    async createToken() {
        const user = { username: "johndoe" };
        return {
            access_token: this.jwtService.sign(user)
        };
    }

    async checkToken(token: string) {
        return this.jwtService.verify(token);
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

        return user;
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
        const user = await this.prisma.user.findFirst({
            where: {
                password: password
            }
        });

        if (!user) {
            throw new UnauthorizedException("Email not found");
        }

        await this.prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: password
            }
        });
    }
}
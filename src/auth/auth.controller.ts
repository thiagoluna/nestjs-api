import { Body, Controller, Headers, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthForgetPasswordDto } from "./dto/auth-forget-password";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthResetPasswordDto } from "./dto/auth-reset-password";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";

@Controller("auth")
export class AuthController {
    
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post("login")
    async login(@Body() body: AuthLoginDto) {
        return this.authService.login(body.email, body.password);
    }

    @Post("register")
    async register(@Body() body: AuthRegisterDto) {
        return this.authService.register(body);
    }

    @Post("forget-password")
    async forgetPassword(@Body() body: AuthForgetPasswordDto) {
        return this.authService.forgetPassword(body.email);
    }

    @Post("reset-password")
    async resetPassword(@Body() body: AuthResetPasswordDto) {
        return this.authService.resetPassword(body.password, body.token);
    }

    @UseGuards(AuthGuard)
    @Post("me")
    async me(@User() user) {
    
        return {user};
    }
}
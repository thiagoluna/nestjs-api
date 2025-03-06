import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create.user.dto";
import { UpdateUserDTO } from "./dto/update.user.dto";
import { UpdatePartialUserDTO } from "./dto/update.partial.user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/ param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";
import { ThrottlerGuard } from "@nestjs/throttler";

@UseGuards(ThrottlerGuard, AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {

    constructor(private readonly UserService: UserService) {}
    
    @Roles(Role.Admin)
    @UseInterceptors(LogInterceptor)
    @Post()
    async create(@Body() data: CreateUserDTO) {
        return this.UserService.create(data);
    }

    @Roles(Role.Admin, Role.User)
    @Get()
    async find() {
        return this.UserService.find();
    }

    @Roles(Role.Admin)
    @Get(':id')
    async findOne(@ParamId() id: number) {
        return this.UserService.findOne(id);
    }

    @Roles(Role.Admin)
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id, @Body() body: UpdateUserDTO) {
        return this.UserService.update(id, body);
    }

    @Roles(Role.Admin)
    @Patch(':id')
    async updatePartial(@ParamId() id: number, @Body() body: UpdatePartialUserDTO) {
        return this.UserService.updatePartial(id, body);
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        this.UserService.exists(id);
        return this.UserService.delete(id);
    }
}
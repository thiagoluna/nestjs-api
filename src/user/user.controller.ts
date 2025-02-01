import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create.user.dto";
import { UpdateUserDTO } from "./dto/update.user.dto";
import { UpdatePartialUserDTO } from "./dto/update.partial.user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/ param-id.decorator";

@Controller('users')
export class UserController {

    constructor(private readonly UserService: UserService) {}
    
    @UseInterceptors(LogInterceptor)
    @Post()
    async create(@Body() data: CreateUserDTO) {
        return this.UserService.create(data);
    }

    @Get()
    async find() {
        return this.UserService.find();
    }

    @Get(':id')
    async findOne(@ParamId() id: number) {
        return this.UserService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id, @Body() body: UpdateUserDTO) {
        return this.UserService.update(id, body);
    }

    @Patch(':id')
    async updatePartial(@ParamId() id: number, @Body() body: UpdatePartialUserDTO) {
        return this.UserService.updatePartial(id, body);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        this.UserService.exists(id);
        return this.UserService.delete(id);
    }
}
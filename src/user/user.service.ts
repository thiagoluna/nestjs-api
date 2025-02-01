import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create.user.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create({email, name, password}: CreateUserDTO) {
        return this.prisma.user.create({
            data: {
                email,
                name,
                password
            }
        });
    }

    async find() {
        return this.prisma.user.findMany();
    }

    async findOne(id: number) {
        await this.exists(id);  

        return this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async update(id: number, data: CreateUserDTO) {
        await this.exists(id);  

        return this.prisma.user.update({
            where: {
                id
            },
            data
        });
    }

    async updatePartial(id: number, data: Partial<CreateUserDTO>) {
        await this.exists(id);  

        return this.prisma.user.update({
            where: {
                id
            },
            data
        });
    }

    async delete(id: number) {
        await this.exists(id);        
        
        return this.prisma.user.delete({
            where: {
                id
            }
        });
    }

    async exists(id: number) {
        if (! await this.prisma.user.count({
            where: {
                id
            }
        })) {
            throw new NotFoundException(`User ${id} not found`);
        }
    }
}
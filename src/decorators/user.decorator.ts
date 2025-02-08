import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

export const User = createParamDecorator((_: undefined, context: ExecutionContext) => {
        const user = context.switchToHttp().getRequest().user;
        if (!user) {
            throw new NotFoundException("User not found");
        }

        return user;
});
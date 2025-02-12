import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}

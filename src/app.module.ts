import { join } from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from '@/app.controller';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
  controllers: [AppController],
  imports: [ServeStaticModule.forRoot({ rootPath: join(__dirname, '../views') }), UserModule, AuthModule]
})
export class AppModule {}

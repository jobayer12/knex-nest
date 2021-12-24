import { Module } from '@nestjs/common';
import { UserModule } from './pages/user/user.module'
import * as path from 'path'
import { ConfigModule } from 'nestjs-config';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    UserModule
  ],
  providers: [
    DatabaseService
  ]
})
export class AppModule {}

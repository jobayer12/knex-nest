import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseTransformer } from '../../../response/response.transformer';
import { UserCreateTransformer } from '../transformer/user.transformer';
import { classToPlain, plainToClass } from 'class-transformer';
import { UserDatabaseService } from '../database-service/user.database.service';


@ApiTags('users')
@Controller('users')
@UseInterceptors(new ResponseTransformer())
export class UserController {

  constructor(private readonly databaseService: UserDatabaseService) {
  }

  @Get()
  async getAllUser(): Promise<any> {
    return await this.databaseService.loadAllUser();
  }

  @Get(':userId')
  async getLocalUserByUserId(@Param('userId') userId: number): Promise<any> {
    return await this.databaseService.loadAllUser({id: userId});
  }

  @Post()
  async createNewLocalUser(@Body() user: UserCreateTransformer): Promise<any> {
    return await this.databaseService.createLocalUser(user);
  }
}
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Admin } from './decorators/roles.decorators';
import { UserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
@Admin()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async create(@Body() user: UserDto): Promise<User> {
    const hash: string = await bcrypt.hash(user.password, 10);
    user.password = hash;
    return await this.service.create(user);
  }

  @Get()
  async findAll(@Res() response): Promise<User[]> {
    const data: User[] = await this.service.findAll();
    return response.status(HttpStatus.OK).json({ data });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response): Promise<User> {
    const data: User = await this.service.findOne(id);
    return response.status(HttpStatus.OK).json({ data });
  }

  @Get(':id')
  async findByEmail(@Param('id') id: string, @Res() response): Promise<User> {
    const data: User = await this.service.findByEmail(id);
    return response.status(HttpStatus.OK).json({ data });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: UserDto): Promise<User> {
    const data: User = await this.service.update(id, user);
    return data;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    const data: User = await this.service.delete(id);
    return data;
  }
}

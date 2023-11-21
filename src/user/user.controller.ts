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

import { UserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async create(@Body() user: UserDto): Promise<User> {
    return await this.service.create(user);
  }

  @Get()
  async getAll(@Res() response): Promise<User[]> {
    const data: User[] = await this.service.getAll();
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

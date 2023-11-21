import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDocument } from './constants/types';
import { UserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userDto: UserDto): Promise<User> {
    const newUser: UserDocument = new this.userModel(userDto);
    return newUser.save();
  }

  async getAll(): Promise<User[]> {
    const users: User[] = await this.userModel.find();
    return users || [];
  }

  async update(id: string, userDto: UserDto): Promise<User> {
    const updatedUser: User = await this.userModel.findByIdAndUpdate(
      id,
      userDto,
      { new: true }
    );
    if (!updatedUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    const deletedUser: User = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return deletedUser;
  }
}

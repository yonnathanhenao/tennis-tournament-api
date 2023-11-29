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

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userModel.find();
    return users || [];
  }

  async findOne(id: string): Promise<User | null> {
    const user: User = await this.userModel.findById(id);
    return user ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user: User = await this.userModel.findOne({ email });
    return user ?? null;
  }

  async update(id: string, userDto: UserDto): Promise<User> {
    const updatedUser: UserDocument = await this.userModel.findByIdAndUpdate(
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
    const deletedUser: UserDocument =
      await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return deletedUser;
  }
}

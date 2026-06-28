import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { USER_MODEL_NAME, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USER_MODEL_NAME)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(username: string, password: string): Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({ username }).exec();

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const createdUser = await this.userModel.create({
      username,
      passwordHash,
    });

    return createdUser;
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }
}

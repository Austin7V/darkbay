import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export const USER_MODEL_NAME = 'User';

export type UserDocument = HydratedDocument<User> & {
  createdAt: Date;
  updatedAt: Date;
};

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  username!: string;

  @Prop({
    required: true,
  })
  passwordHash!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

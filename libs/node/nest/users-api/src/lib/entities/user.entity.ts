import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsOptional, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// import { Factory } from 'nestjs-seeder';

export type UserDocument = User & Document;

export enum UserRoles {
  admin = 'admin',
  user = 'user',
  visitor = 'visitor',
  // editor = 'editor',
  finance = 'finance',
}

export enum LoginProviders {
  local = 'local',
  google = 'google',
  github = 'github',
}

@Schema({ timestamps: true })
export class User {
  @Prop() readonly createdAt?: Date;
  @Prop() readonly updatedAt?: Date;

  @ApiProperty({
    description: `User id`,
    example: 'some id',
    readOnly: true,
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  readonly _id?: string;
  // readonly _id?: S.Types.ObjectId;

  @Prop({})
  @ApiProperty({
    description: `User's name`,
    examples: {
      empty: {
        value: '',
        summary: 'Empty value',
      },
      aris: {
        value: 'Aris',
        summary: 'A simple Aris user',
      },
      yuri: {
        value: 'Ares',
        summary: 'A simple Ares user',
      },
    },
  })
  //  @Factory((faker) => faker.name.findName()) // todo check again and fix
  /**
   * User Name
   * */
  name: string | undefined;

  @Prop({
    index: true,
    required: true,
  })
  @ApiProperty({
    description: `User email`,
    default: 'a@a.com',
    required: true,
  })
  @IsEmail()
  email: string | undefined;

  @Prop()
  @ApiProperty({
    description: `User's password`,
    examples: {
      letters: {
        value: 'qweasd',
        description: 'Password letters',
        summary: 'Password 6 letters',
      },
      numbers: {
        value: '12345',
        description: 'Password numbers',
        summary: 'Password 6 numbers',
      },
    },
  })
  password?: string;

  @Prop({ index: true })
  @ApiProperty({
    description: `User's tenantId`,
    examples: {
      letterss: {
        value: '',
        description: 'tenantId letters',
        summary: 'not value',
      },
      letters: {
        value: 'qweasd',
        description: 'tenantId letters',
        summary: 'tenantId 6 letters',
      },
      numbers: {
        value: '12345',
        description: 'tenantId numbers',
        summary: 'tenantId 6 numbers',
      },
    },
  })
  tenantId: string | undefined;

  @Prop({
    type: String,
    enum: LoginProviders,
    default: LoginProviders.local,
  })
  @ApiProperty({
    description: `User's provider`,
    example: LoginProviders.google,
    enum: LoginProviders,
    default: LoginProviders.local,
    required: true,
  })
  provider: LoginProviders | undefined;

  @Prop({ type: String, enum: UserRoles, default: UserRoles.admin })
  @ApiProperty({
    description: `User's role`,
    example: UserRoles.admin,
    enum: UserRoles,
    default: UserRoles.visitor,
    required: true,
  })
  role: UserRoles | undefined;
}

export const UserSchema = SchemaFactory.createForClass(User);

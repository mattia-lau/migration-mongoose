import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HelloWorldDoc = HelloWorld & Document;

@Schema({ collection: 'users', timestamps: true })
export class HelloWorld {
  @Prop({ type: String, unique: true })
  message: string;
}

export const HelloWorldSchema = SchemaFactory.createForClass(HelloWorld);

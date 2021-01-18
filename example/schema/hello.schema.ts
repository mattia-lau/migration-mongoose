import { Schema, Document } from 'mongoose';

export type HelloWorldDoc = HelloWorld & Document;

export interface HelloWorld {
  message: string;
}

export const HelloWorldSchema = new Schema({
  message: String,
});
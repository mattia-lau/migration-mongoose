import { Schema } from 'mongoose';

export interface IHelloWorld extends Document {
  message: string;
}

export const helloWorldSchema = new Schema({
  message: String,
});

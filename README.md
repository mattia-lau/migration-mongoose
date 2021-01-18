# migration-mongoose

Typescript based migration framework for mongoose. After finish the migration, the className will be saved to MongoDB. You may delete the record from MongoDB or Update the className.

# Installation

```bash
yarn add migration-mongoose
yarn add mongoose
# New version not required to install @types/mongoose
```

## Motivation

Relational Database have TypeORM with their own cli to achieve the migration step. However, there are no cli or package for well manage migration for mongodb

## Usage

### Runtime Execution

```typescript
// index.ts
import { config } from 'dotenv';
import { runMigrations } from 'migration-mongoose';
config();

const MONGO_URL = process.env.MONGO_CONNECTION_STRING;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

runMigrations({
  uri: MONGO_URL,
  migrations: ['**/*.migration.ts'],
  useUnifiedTopology: true,
  useNewUrlParser: true,
  replicaSet: 'rs0',
  useCreateIndex: true,
  user: MONGO_USER,
  pass: MONGO_PASSWORD,
});

// NestJS example
// hello-world.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HelloWorldDoc = HelloWorld & Document;

@Schema({ collection: 'users', timestamps: true })
export class HelloWorld {
  @Prop({ type: String, unique: true })
  message: string;
}

export const HelloWorldSchema = SchemaFactory.createForClass(HelloWorld);

// Pure Schema
// hello-world.schema.ts
import { Schema } from 'mongoose';

export interface HelloWorld extends Document {
  message: string;
}

export const HelloWorldSchema = new Schema({
  message: String,
});

// hello-world.migration.ts
import { Connection } from 'mongoose';
import { MigrationInterface } from 'migration-mongoose';
import { HelloWorldSchema } from './schema/hello.schema';
// Or import nestjs schema
import { HelloWorld } from './schema/hello.schema';

// Please implements MigrationInterface
// If you are Using JavaScript, just make sure up and down method is exist
export class HelloWorldMigration1610982203671 implements MigrationInterface {
  async up(connection: Connection): Promise<void> {
    await connection
      .model('helloworlds', HelloWorldSchema)
      .create<HelloWorld>({ message: 'Hello World' });
    return;
  }

  down(connection: Connection): Promise<void> {
    return;
  }
}
```

### Within Docker container

```bash
docker exec -it <container ID/name> bash
# Assume you have created the script in package.json
yarn <script name>
# If no script tag
yarn ts-node <path>
```
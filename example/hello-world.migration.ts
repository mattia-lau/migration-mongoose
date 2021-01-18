import { Connection } from "mongoose";
import { MigrationInterface } from "migration-mongoose";
import { HelloWorldSchema, HelloWorld } from "./schema/hello.schema";

export class HelloWorldMigration1610982203671 implements MigrationInterface {
  async up(connection: Connection): Promise<void> {
    await connection
      .model("helloworlds", HelloWorldSchema)
      .create<HelloWorld>({ message: "Hello World" });
    return;
  }

  down(connection: Connection): Promise<void> {
    return;
  }
}

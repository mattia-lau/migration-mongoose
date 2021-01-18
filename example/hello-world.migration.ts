import { Connection } from "mongoose";
import { MigrationInterface } from "migration-mongoose";
import { helloWorldSchema } from "./schema/hello.schema";
import { HelloWorld } from "./schema/hello.schema.nestjs";

export class HelloWorldMigration1610982203671 implements MigrationInterface {
  async up(connection: Connection): Promise<void> {
    await connection
      .model("helloworlds", helloWorldSchema)
      .create<HelloWorld>({ message: "Hello World" });
    return;
  }

  down(connection: Connection): Promise<void> {
    return;
  }
}

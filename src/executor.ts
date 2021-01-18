import { connect, ConnectOptions, Schema } from "mongoose";
import { importClassesFromDirectories } from "./import-class-by-dirs";
import { ConfigProps } from "./types";

const Any = new Schema({ any: Schema.Types.Mixed }, { strict: false });
const getDb = (uri: string, options: ConnectOptions) => connect(uri, options);

export const runMigrations = async (options: ConfigProps) => {
  const {
    uri,
    migrations,
    migrationsCollectionName = "migrations",
    ...other
  } = options;

  const connection = await getDb(uri, other);

  const classes = importClassesFromDirectories(migrations);

  const Migration = connection.model(migrationsCollectionName, Any);

  for (let i = 0; i < classes.length; i++) {
    const clazz = new classes[i]();
    const name = clazz.constructor.name;
    const exists = await Migration.findOne({ migration: name });

    if (exists !== null) {
      continue;
    }

    await clazz.up(connection);
    await clazz.down(connection);

    const migrationModel = new Migration({
      migration: name,
      createdAt: new Date(),
    });
    await migrationModel.save();
  }

  console.log("Done Migrations");
};

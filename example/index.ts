import { config } from "dotenv";
import { runMigrations } from "migration-mongoose";
config();

const MONGO_URL = process.env.MONGO_CONNECTION_STRING;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

runMigrations({
  uri: MONGO_URL,
  migrations: ["**/*.migration.ts"],
  useUnifiedTopology: true,
  useNewUrlParser: true,
  replicaSet: "rs0",
  useCreateIndex: true,
  user: MONGO_USER,
  pass: MONGO_PASSWORD,
});

import { Connection, ConnectOptions } from 'mongoose';

export interface ConfigProps extends ConnectOptions {
  uri: string;
  migrations: string[];
  migrationsCollectionName?: string;
}

export interface MigrationInterface {
  up(connection: Connection): Promise<void>;
  down(connection: Connection): Promise<void>;
}

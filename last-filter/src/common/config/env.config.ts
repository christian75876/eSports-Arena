import { config } from 'dotenv';

config();
export const EnvConfig = () => ({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_DB_PORT),
  database: process.env.POSTGRES_DB,
  usernameDb: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

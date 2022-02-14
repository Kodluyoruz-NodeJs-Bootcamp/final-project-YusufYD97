import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection, getConnectionOptions, ConnectionOptions } from 'typeorm';
import userRoutes from './routes/user.route';
import movieRoutes from './routes/movie.route';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const getOptions = async () => {
  let connectionOptions: ConnectionOptions;

  connectionOptions = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    // @ts-ignore next-line
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE_NAME,
    synchronize: true,
    logging: false,
    extra: {
      ssl: true,
    },
    entities: ['dist/entity/**/*.{ts,js}'],
    migrations: ['dist/migration/**/*.{ts,js}'],
    subscribers: ['dist/subscriber/**/*.{ts,js}'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    }
  };

  return connectionOptions;
}

const connect2Database = async (): Promise<void> => {
  const typeormConfig = await getOptions();
  await createConnection(typeormConfig);
};

connect2Database().then(async () => {
  console.log('Connection established!');
}).catch((err) => {
  console.log('An error occurred while establishing connection', err);
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use(userRoutes);
app.use(movieRoutes);

app.listen(process.env.PORT || 3000);
console.log('Server on port', process.env.PORT || 3000);
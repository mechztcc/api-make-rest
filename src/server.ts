import 'reflect-metadata';
import '@shared/container';
import '@shared/typeorm/';
import 'express-async-errors';

import routes from '@shared/routes/index';
import { errors } from 'celebrate';
import cors from 'cors';
import { config } from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';

import AppError from './config/errors/AppError';

config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ statusCode: error.statusCode, message: error.message });
  } else {
    console.log(error);
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  }
});

const port = process.env.API_PORT;
app.listen(port, () => {
  console.log(`Server running at localhost:${port}`);
});

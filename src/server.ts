import 'reflect-metadata';
import 'express-async-errors';
require('dotenv').config()

import express, { NextFunction, Request, Response } from 'express';
import AppError from './config/errors/AppError';

import routes from './shared/routes/index';

const app = express();
app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  } else {
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  }
});


const port = process.env.API_PORT
app.listen(port, () => {
  console.log(`Server running at localhost:${port}`);
});

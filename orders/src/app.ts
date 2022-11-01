import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError, currentUser } from '@cbanchio5tickets/common';
import cookieSession from "cookie-session";
import { deleteOrderRouter } from './routes/delete';
import { newOrderRouter } from './routes/new';
import { indexOrderRouter } from './routes';
import { showOrderRouter } from './routes/show';

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(cookieSession({
  signed:false,
  secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUser);
app.use(deleteOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);

app.all('*', ()=> {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app }

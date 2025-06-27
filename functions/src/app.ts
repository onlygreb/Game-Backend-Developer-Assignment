import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

if (process.env['NODE_ENV'] === 'development') {
  app.use(morgan('dev'));
}

app.use(router);

app.use((_req, res, _next) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(
  (err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Internal error' });
  },
);

export default app;

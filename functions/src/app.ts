import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';

const app = express();

app.use(
  cors({ origin: true, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], credentials: true })
);

app.use(express.json());

if (process.env['NODE_ENV'] === 'development') {
  app.use(morgan('dev'));
}

app.use('/api', router);

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});
export default app;
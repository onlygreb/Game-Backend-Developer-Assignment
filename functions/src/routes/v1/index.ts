import { Router } from 'express';
import games from './games';

const v1 = Router();
v1.use('/games', games);

export default v1;
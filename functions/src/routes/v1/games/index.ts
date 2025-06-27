import { Router } from 'express';
import wrapAsync from '../../../utils/wrapAsync';
import { GameSchema } from '../../../validators/gameSchema';
import { listGames, saveGame, deleteGame } from '../../../apis/firestore/games';

const router = Router();

router.get(
  '/',
  wrapAsync(async (_req, res) => {
    res.json(await listGames());
  }),
);

router.post(
  '/',
  wrapAsync(async (req, res) => {
    const parsed = GameSchema.parse(req.body);
    await saveGame(parsed);
    res.status(201).json(parsed);
  }),
);

router.put(
  '/:id',
  wrapAsync(async (req, res) => {
    const payload = { ...req.body, id: req.params['id'] };
    const parsed = GameSchema.parse(payload);
    await saveGame(parsed);
    res.json(parsed);
  }),
);

router.delete(
  '/:id',
  wrapAsync(async (req, res) => {
    await deleteGame(req.params['id']);
    res.status(204).send();
  }),
);

export default router;

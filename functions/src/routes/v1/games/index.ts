import { Router } from 'express';
import wrapAsync from '../../../utils/wrapAsync';
import { GameSchema, NewGameSchema } from '../../../validators/gameSchema';
import { listGames, saveGame, deleteGame } from '../../../apis/firestore/games';
import { getFirestore } from '../../../apis/firestore/getFirestore';

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
    const partial = NewGameSchema.parse(req.body);

    const db = getFirestore();
    const col = db.collection('games');
    const docRef = partial.id ? col.doc(partial.id) : col.doc();

    const game = { ...partial, id: docRef.id };
    await docRef.set(game);

    const validated = GameSchema.parse(game);
    res.status(201).json(validated);
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

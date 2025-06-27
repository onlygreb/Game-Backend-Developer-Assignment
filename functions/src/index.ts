import * as functions from 'firebase-functions/v1';
import app from './app';

export const api = functions
  .region('europe-west3')
  .runWith({ maxInstances: 5 })
  .https.onRequest(app);

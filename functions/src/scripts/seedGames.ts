#!/usr/bin/env ts-node

import fs from 'fs/promises';
import path from 'path';
import admin from 'firebase-admin';
import { Game } from '../types/game';

const PROJECT_ID = process.env['GCLOUD_PROJECT'] ?? 'gbda-9e9dd';

const EMULATOR_HOST = process.env['FIRESTORE_EMULATOR_HOST'] ?? '127.0.0.1:5003';

async function main() {
    process.env['FIRESTORE_EMULATOR_HOST'] = EMULATOR_HOST;
    admin.initializeApp({ projectId: PROJECT_ID });

    const db = admin.firestore();
    const col = db.collection('games');

    const jsonPath = path.resolve(__dirname, '../../../games.json');
    const raw = await fs.readFile(jsonPath, 'utf-8');
    const games: Game[] = JSON.parse(raw);

    const batch = db.batch();
    (await col.get()).docs.forEach(d => batch.delete(d.ref));
    games.forEach(g => batch.set(col.doc(g.id), g));
    await batch.commit();

    console.log(`Seeded ${games.length} games!`);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

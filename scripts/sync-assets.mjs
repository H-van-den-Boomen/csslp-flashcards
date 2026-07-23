// Copies the shared deck data + audio from the web version (repo root) into
// the APK web dir (app/), so we store the 15 MB of audio only once in git.
// Run before `npx cap sync`. The APK-specific UI (app/index.html, styles.css,
// app.js) is committed; app/cards.json and app/audio are generated + ignored.
import { cpSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const app = join(root, 'app');

mkdirSync(app, { recursive: true });
cpSync(join(root, 'cards.json'), join(app, 'cards.json'));
cpSync(join(root, 'audio'), join(app, 'audio'), { recursive: true });
console.log('Synced cards.json + audio/ into app/');

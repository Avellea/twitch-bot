/*
    This is really just a toy project to learn how to use twurple.
    I don't really know if I'll stick with this, but it's interesting to learn I guess.
    Maybe MK can take a look too and see if she has any ideas.

    Also, no gamba PepeLaugh
*/

// Main entry point

import { connect, disconnect } from './util/connect.js';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/enable', (req, res) => {
    connect();
    res.json({ message: 'Bot enabled.' });
});

app.get('/api/disable', (req, res) => {
    disconnect();
    res.json({ message: 'Bot disabled.' });
});

app.listen(port, () => {
    console.log(`Twitch Bot CPanel listening at http://localhost:${port}`);
});
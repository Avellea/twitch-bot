/*
    This is really just a toy project to learn how to use twurple.
    I don't really know if I'll stick with this, but it's interesting to learn I guess.
    Maybe MK can take a look too and see if she has any ideas.
*/

// Main entry point

import app from './util/api.js';

import getStatus from './routes/status.js'
import enableBot from './routes/enable.js';
import disableBot from './routes/disable.js';

const port = 3000;

app.get('/api/enable', (req, res) => {
    if(enableBot()) {
        res.json({status: "1", message: "Bot enabled."});
    } else {
        res.json({status: "0", message: "Failed to enable bot."});
    }
    // enableBot();
    // // res.json({ message: 'Bot enabled.' });
    // res.json({status: "1", message: "Bot enabled."});
});


app.get('/api/disable', (req, res) => {
    if(disableBot()) {
        res.json({status: "0", message: "Bot disabled."});
    } else {
        res.json({status: "1", message: "Failed to disable bot."});
    }
    // disableBot();
    // // res.json({ message: 'Bot disabled.' });
    // res.json({status: "0", message: "Bot disabled."});
});

app.get('/api/status', (req, res) => {
    res.json(getStatus());
});

app.listen(port, () => {
    console.log(`Twitch Bot CPanel listening at http://localhost:${port}`);
});
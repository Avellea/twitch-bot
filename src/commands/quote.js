// I see lots of other streamers and such have a quote command, so this is my take on it.
// This command reads all of the text files in a folder named after the channel it was executed in,
// then selects either a random quote (if no argument is provided) or a quote matching the provided number.

// I should refactor this eventually instead of constant file listing, maybe a cache? Irdk.

import * as fs from 'fs';

export default function quoteCommand(channel, user, message, chatClient) {
    const quoteNumber = message.split(' ')[1];

    if (!quoteNumber) {
        fs.readdir(`assets/quotes/${channel}`, (err, files) => {
            var randomQuote = Math.floor((Math.random() * files.length) + 1);
            getQuote(randomQuote, user, channel, chatClient);
        })
        return;
    }
    getQuote(quoteNumber, user, channel, chatClient);
}

function getQuote(quoteNumber, user, channel, chatClient) {
    fs.readFile(`assets/quotes/${channel}/${quoteNumber}.txt`, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading quote ${quoteNumber}:`, err);
            chatClient.say(channel, `@${user}, I couldn't find quote #${quoteNumber}. Please check the number and try again.`);
            return;
        }
        // Send the quote to the chat
        chatClient.say(channel, `Quote #${quoteNumber}: ${data.trim()}`);

    });
}
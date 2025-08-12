import * as fs from 'fs';

export default function quoteCommand(channel, user, message, chatClient) {
    const quoteNumber = message.split(' ')[1];

    if (!quoteNumber) {
        fs.readdir(`quotes/${channel}`, (err, files) => {
            var randomQuote = Math.floor((Math.random() * files.length) + 1);
            getQuote(randomQuote, channel, chatClient);
        })
        return;
    }
    getQuote(quoteNumber, channel, chatClient);
}

function getQuote(quoteNumber, channel, chatClient) {
    fs.readFile(`quotes/${channel}/${quoteNumber}.txt`, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading quote ${quoteNumber}:`, err);
            chatClient.say(channel, `@${user}, I couldn't find quote #${quoteNumber}. Please check the number and try again.`);
            return;
        }
        // Send the quote to the chat
        chatClient.say(channel, `Quote #${quoteNumber}: ${data.trim()}`);

    });
}
import * as fs from 'fs';

export default function quoteCommand(channel, user, message, chatClient) {
    // Extract the quote number from the message
    const quoteNumber = message.split(' ')[1];

    if (!quoteNumber) {
        chatClient.say(channel, `@${user}, please provide a quote number.`);
        return;
    }

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
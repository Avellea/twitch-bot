// This command is to be used in tandem with `./quote.js`.
// When executed with an argument, it will add the text as a new quote in the channel's quote folder.
// The command will get the number of existing files in the channels directory and add one to keep the quotes sequential.
// If no argument is provided, it will prompt the user to provide a quote.

import * as fs from 'fs';

export default function quoteCreate(channel, user, message, chatClient) {
    // Extract the quote text from the message
    const quoteText = message.substring(message.indexOf(' ') + 1).trim();

    if (!quoteText) {
        chatClient.say(channel, `@${user}, please provide a quote to add.`);
        return;
    }

    // Read existing quotes to determine the next quote number
    fs.readdir(`assets/quotes/${channel}`, (err, files) => {
        if (err) {
            console.error('Error reading quotes directory:', err);
            chatClient.say(channel, `@${user}, there was an error adding your quote. Please try again later.`);
            return;
        }

        const nextQuoteNumber = files.length + 1;
        const filePath = `assets/quotes/${channel}/${nextQuoteNumber}.txt`;

        // Write the new quote to a file
        fs.writeFile(filePath, quoteText, (err) => {
            if (err) {
                console.error(`Error writing quote ${nextQuoteNumber}:`, err);
                chatClient.say(channel, `@${user}, there was an error adding your quote. Please try again later.`);
                return;
            }

            chatClient.say(channel, `@${user}, your quote has been added as quote #${nextQuoteNumber}!`);
        });
    });
}
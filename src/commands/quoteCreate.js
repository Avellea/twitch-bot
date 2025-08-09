import * as fs from 'fs';

export default function quoteCreate(channel, user, message, chatClient) {
    // Extract the quote text from the message
    const quoteText = message.substring(message.indexOf(' ') + 1).trim();

    if (!quoteText) {
        chatClient.say(channel, `@${user}, please provide a quote to add.`);
        return;
    }

    // Read existing quotes to determine the next quote number
    fs.readdir('quotes', (err, files) => {
        if (err) {
            console.error('Error reading quotes directory:', err);
            chatClient.say(channel, `@${user}, there was an error adding your quote. Please try again later.`);
            return;
        }

        const nextQuoteNumber = files.length + 1;
        const filePath = `quotes/${nextQuoteNumber}.txt`;

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
// This command is to be used in tandem with `./quote.js`.
// When executed with an argument, it will add the text as a new quote in the channel's quote folder.
// The command will get the number of existing files in the channels directory and add one to keep the quotes sequential.
// If no argument is provided, it will prompt the user to provide a quote.

// I've reworked the entire quote command to use a database instead of text files. I'll keep the comment above for posterity
// but wow, this is so much better to manage.

import supabase from '../util/supabase.js';

export default function quoteCreate(channel, user, message, chatClient) {
    const quoteText = message.substring(message.indexOf(' ') + 1).trim();

    if (quoteText === '!addquote') {
        chatClient.say(channel, `@${user}, please provide a quote to add.`);
        return;
    }

    // Insert the new quote into the database
    supabase
        .from(channel)
        .insert([{ quote: quoteText }])
        .then(({ data, error }) => {
            if (error) {
                console.error('Error inserting quote:', error);
                chatClient.say(channel, `@${user}, there was an error adding your quote. Please try again later.`);
            } else {
                chatClient.say(channel, `@${user}, your quote has been added successfully!`);
            }
        });
        
}

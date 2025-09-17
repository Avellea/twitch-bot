// I see lots of other streamers and such have a quote command, so this is my take on it.
// This command reads all of the text files in a folder named after the channel it was executed in,
// then selects either a random quote (if no argument is provided) or a quote matching the provided number.

// Refactored! It uses a database now!

import supabase from '../util/supabase.js';

export default function quoteCommand(channel, user, message, chatClient) {
    const quoteNumber = message.split(' ')[1];

    if (!quoteNumber) {
        supabase
            .from(channel)
            .select()
            .then(({ data, error }) => {
                if (error) {
                    console.error('Error fetching quotes:', error);
                    chatClient.say(channel, `@${user}, there was an error fetching a quote. Please try again later.`);
                } else {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    const randomQuote = data[randomIndex];
                    chatClient.say(channel, `Quote #${randomQuote.id}: ${randomQuote.quote}`);
                }
            });
        return;
    }

    supabase
        .from(channel)
        .select()
        .eq('id', quoteNumber)
        .then(({ data, error }) => {
            if (error || data.length === 0) {
                console.error(`Error fetching quote ${quoteNumber}:`, error);
                chatClient.say(channel, `@${user}, I couldn't find quote #${quoteNumber}. Please check the number and try again.`);
            } else {
                const quote = data[0];
                chatClient.say(channel, `Quote #${quote.id}: ${quote.quote}`);
            }
        });
}

// I see lots of other streamers and such have a quote command, so this is my take on it.
// This command reads all of the text files in a folder named after the channel it was executed in,
// then selects either a random quote (if no argument is provided) or a quote matching the provided number.

// Refactored! It uses a database now!

import supabase from '../util/supabase.js';

export default async function quoteCommand(channel, user, message, chatClient) {
    const quoteNumber = message.split(' ')[1];

    if (!quoteNumber) {
        const { count } = await supabase
        .from(channel)
        .select("", { count: "exact", head: true });

        if (count > 0) {
            // 2. Pick a random offset
            const randomIndex = Math.floor(Math.random(), count);
            // console.log(randomIndex);
            console.log(count)

            const { data, error } = await supabase
                .from(channel)
                .select("*")
                .range(randomIndex, randomIndex); // get just that row

            console.log(data);
            chatClient.say(channel, `Quote #${data[0].id}: ${data[0].quote}`);

            return;
        }
    }

    // supabase
    //     .from(channel)
    //     .select()
    //     .eq('id', quoteNumber)
    //     .then(({ data, error }) => {
    //         if (error || data.length === 0) {
    //             console.error(`Error fetching quote ${quoteNumber}:`, error);
    //             chatClient.say(channel, `@${user}, I couldn't find quote #${quoteNumber}. Please check the number and try again.`);
    //         } else {
    //             const quote = data[0];
    //             chatClient.say(channel, `Quote #${quote.id}: ${quote.quote}`);
    //         }
    //     });
}

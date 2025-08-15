// This was a fun one. Twurple's API calls are stupid honestly. Anyway, this is a basic chat filtering system.
// It can be used for easier moderation, if you don't want to use Twitch's implementation on the site.

import { filterList } from '../../assets/filter.js'
import handleCommand from '../util/commandHandler.js';

export default async function messageEvent(channel, user, message, msg, apiClient, chatClient) {

    // Ensure the message is completely lower, as that's what the filter expects.
    message = message.toLowerCase()
    
    // This searches the message for any instance of any word/phrase from the filter list.
    const found = filterList.some(word => message.includes(word));

    // Get the user ID of the streamer in which the chat message took place.
    // This can be hardcoded if the intention is just for one channel.
    const broadcaster = await apiClient.users.getUserByName(channel);

    // Check each word in a message for a banned word, defined in the filter list.
    if(found) {
        apiClient.moderation.deleteChatMessages(broadcaster, msg.id);
        chatClient.say(channel, "Whoops! Can't say that in a Christian manga!");
        return;
    } else if (!message.startsWith('!')) return; // Ignore any input text and send it as a regular message.

    // Finally, handle the command, if it is one.
    handleCommand(channel, user, message, msg, apiClient, chatClient);

}
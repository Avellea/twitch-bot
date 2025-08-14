import { filterList } from '../../assets/filter.js'
import handleCommand from '../util/commandHandler.js';

// 261332535 is the user id for kazukivt

export default async function messageEvent(channel, user, message, msg, apiClient, chatClient) {
    const found = filterList.some(word => message.includes(word));
    // const broadcaster = await apiClient.users.getUserByName(channel);
    // console.log(broadcaster.id)
    
    // Check each word in a message for a banned word, defined in the filter list.
    if(found) {
        apiClient.moderation.deleteChatMessages(261332535, msg.id);
        chatClient.say(channel, "Whoops! Can't say that in a Christian manga!");
        return;
    } else if (!message.startsWith('!')) return; // Ignore any input text and send it as a regular message.

    // Finally, handle the command, if it is one.
    handleCommand(channel, user, message, msg, apiClient, chatClient);

}
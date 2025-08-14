import 'dotenv/config';

import { StaticAuthProvider } from '@twurple/auth';
import { ChatClient } from '@twurple/chat';
import { ApiClient } from '@twurple/api';

// Utility functions
import handleCommand from './commandHandler.js';

// Event functions
import messageEvent from '../events/onMessage.js';
import emoteOnlyEvent from '../events/emoteOnly.js';
import subscribeEvent from '../events/onSubscribe.js';
import resubscribeEvent from '../events/onResubscribe.js';

// This variable, and the following array, may get moved to a config file later.
const MY_CHANNEL = 'kazukivt';

const CHANNELS_TO_JOIN = [
    "kazukivt",
    // Add more channels here if needed
];

const authProvider = new StaticAuthProvider(
    process.env.TWITCH_CLIENT_ID,
    process.env.TWITCH_ACCESS_TOKEN
);

const apiClient = new ApiClient({ authProvider });

async function getBannedUsers(channelName) {
    const user = await api.users.getUserByName(channelName);
    const paginator = api.moderation.getBannedUsersPaginated(user);
    const bannedUsers = [];
    for await(const ban of paginator) {
        bannedUsers.push({
            userName: ban.userName
        });
    }
    return bannedUsers;
    // console.log(user);
}

// This is the actual "client" that does the chatting. 
const chatClient = new ChatClient({
    authProvider,
    channels: CHANNELS_TO_JOIN,
});


// Connect to Twitch chat
// We do a little error handling here Pepega
export async function connect() {
    try {
        console.log(`Connecting to chat as ${MY_CHANNEL}...`);
        chatClient.connect();
        console.log('Connected to chat.');
    } catch (error) {
        console.error('Error connecting to chat:', error);
    }
}

// Unused for now.
export function disconnect() {
    try {
        console.log('Disconnecting from chat...');
        chatClient.quit();
        console.log('Disconnected from chat.');
    } catch (error) {
        console.error('Error disconnecting from chat:', error);
    }
}


/*
    Event listeners
    These will listen for events in the chat or channel and respond accordingly.
*/

chatClient.onMessage((channel, user, message, msg) => {
    messageEvent(channel, user, message, msg, apiClient, chatClient);
    // if(!message.startsWith('!')) return; // Ignore messages that don't start with '!'

    // Pass off the message to the command handler
    // handleCommand(channel, user, message, msg, apiClient, chatClient);
});

chatClient.onEmoteOnly((channel, enabled) => {
    emoteOnlyEvent(channel, enabled, chatClient);
    // console.log(`Emote-only mode is now ${enabled ? 'enabled' : 'disabled'} in ${channel}`);
});

chatClient.onSub((channel, user, subInfo, msg, chatClient) => {
    subscribeEvent(channel, user, subInfo, msg, chatClient);
    // console.log(`User ${user} has subscribed to ${channel}. Sub info:`, subInfo);
});

chatClient.onResub((channel, user, subInfo, msg, chatClient) => {
    resubscribeEvent(channel, user, subInfo, msg, chatClient);
})

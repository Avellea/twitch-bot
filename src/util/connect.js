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
});

chatClient.onEmoteOnly((channel, enabled) => {
    emoteOnlyEvent(channel, enabled, chatClient);
});

chatClient.onSub((channel, user, subInfo, msg) => {
    subscribeEvent(channel, user, subInfo, msg, chatClient);
});

chatClient.onResub((channel, user, subInfo, msg) => {
    resubscribeEvent(channel, user, subInfo, msg, chatClient);
})

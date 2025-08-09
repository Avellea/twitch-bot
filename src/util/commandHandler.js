// Utility functions
import removeUnicodeChar from './sanitize.js';

// Commands
import discordCommand from '../commands/discord.js';
import lurkCommand from '../commands/lurk.js';
import quoteCreate from '../commands/quoteCreate.js';
import quoteCommand from '../commands/quote.js';
import rollCommand from '../commands/roll.js';
import shoutoutCommand from '../commands/shoutout.js';


import modCheck from '../util/modCheck.js';

export default function handleCommand(channel, user, message, msg, apiClient, chatClient) {
    

    message = removeUnicodeChar(message);
    console.log(
        `Received message from ${user} in ${channel}: ${message} `
    );
    

    if (message.toLowerCase() === '!discord') {
        discordCommand(channel, chatClient);
        return;
    }


    if (message.toLowerCase() === '!lurk') {
        lurkCommand(user, channel, chatClient);
        return;
    }


    if (message.toLowerCase().startsWith('!addquote')) {
        // Check if the user is a moderator
        if (!modCheck(user, msg)) {
            chatClient.say(channel, `Sorry ${user}, you need to be a moderator to use this command.`);
            return;
        }

        quoteCreate(channel, user, message, chatClient);

        return;
    }


    if (message.toLowerCase().startsWith('!quote')) {
        quoteCommand(channel, user, message, chatClient);
        return;
    }


    if (message.toLowerCase() === '!roll') {
        rollCommand(user, channel, chatClient);
        return;
    }


    if (message.toLowerCase().startsWith('!so')) {
        // Check if the user is a moderator
        if (!modCheck(user, msg)) {
            chatClient.say(channel, `Sorry ${user}, you need to be a moderator to use this command.`);
            return;
        }

        const targetUser = message.split(' ')[1];

        if (targetUser) {
            shoutoutCommand(targetUser, channel, chatClient);
        } else {
            chatClient.say(channel, `Please specify a user to shout out.`);
        }
    }


    // Debug command only!
    if (message.toLowerCase() === '!modcheck') {
        modCheck(user, channel, msg, chatClient);
        return;
    }

}
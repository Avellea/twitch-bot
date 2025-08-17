// This is the entire command handler at the moment. It passes along pretty much any data it could possibly need 
// from the onMessage event in `./connect.js`.

// I'd REALLY like the clean this up at some point, both in code and style. It's a mess...

// Utility functions
import removeUnicodeChar from './sanitize.js';
import modCheck from '../util/modCheck.js';

// Commands
import coinflipCommand from '../commands/coinflip.js';
import discordCommand from '../commands/discord.js';
import helpCommand from '../commands/help.js';
import headpatCommand from '../commands/headpat.js'
import lurkCommand from '../commands/lurk.js';
import quoteCreate from '../commands/quoteCreate.js';
import quoteCommand from '../commands/quote.js';
import rollCommand from '../commands/roll.js';
import shoutoutCommand from '../commands/shoutout.js';


export default function handleCommand(channel, user, message, msg, apiClient, chatClient) {
    
    //Nifty little function! see `./sanitize.js`
    message = removeUnicodeChar(message);
    
    // console.log(
    //     `Received message from ${user} in ${channel}: ${message} `
    // );
    

    if (message.toLowerCase() === '!coinflip') {
        coinflipCommand(channel, user, chatClient);
        return;
    }


    if (message.toLowerCase() === '!discord') {
        discordCommand(channel, chatClient);
        return;
    }


    if (message.toLowerCase() === '!help') {
        helpCommand(channel, user, chatClient);
        return;
    }


    if (message.toLowerCase().startsWith('!headpat')) {
        const targetUser = message.split(' ')[1];
        if (targetUser) {
            headpatCommand(user, targetUser, channel, chatClient);
        } else {
            chatClient.say(channel, `${user} gives everyone headpats!`);
        }
    }


    if (message.toLowerCase() === '!lurk') {
        lurkCommand(user, channel, chatClient);
        return;
    }


    if (message.toLowerCase().startsWith('!addquote')) {
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
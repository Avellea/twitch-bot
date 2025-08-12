// Really?

export default function helpCommand(channel, user, chatClient) {
    chatClient.say(channel, `@${user}, you can find available commands here: https://github.com/Avellea/twitch-bot/blob/master/docs/commands.md`);
}
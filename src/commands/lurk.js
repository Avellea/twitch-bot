// Lurk command for Twitch chat. This is a simple command that lets users indicate they are lurking in the chat without actively participating.

export default function lurkCommand(user, channel, chatClient) {
    chatClient.say(channel, `/me kazuki25Lurk ${user} is lurking in the shadows... `);
}
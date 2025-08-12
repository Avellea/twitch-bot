// Twitch allows you to set the chat to emote-only mode, restricting messages to emotes only.
// The code below is fired when emote-only mode is toggled. I'll do something useful here later,
// but I wanted to put some placeholder code just to see how it works.

export default function emoteOnlyEvent(channel, enabled, chatClient) {
    console.log(`Emote-only mode is now ${enabled ? 'enabled' : 'disabled'} in ${channel}`);
    
    if (enabled) {
        chatClient.say(channel, `Emote-only mode has been enabled. Please use only emotes in the chat!`);
    } else {
        chatClient.say(channel, `Emote-only mode has been disabled. You can now chat normally!`);
    }
}
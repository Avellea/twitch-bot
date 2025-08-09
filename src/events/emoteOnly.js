export default function emoteOnlyEvent(channel, enabled, chatClient) {
    console.log(`Emote-only mode is now ${enabled ? 'enabled' : 'disabled'} in ${channel}`);
    
    if (enabled) {
        chatClient.say(channel, `Emote-only mode has been enabled. Please use only emotes in the chat!`);
    } else {
        chatClient.say(channel, `Emote-only mode has been disabled. You can now chat normally!`);
    }
}
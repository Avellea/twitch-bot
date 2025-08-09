export default function shoutoutCommand(user, channel, chatClient) {

    if (user.charAt(0) === '@') {
        user = user.slice(1); // Remove '@' if it exists
    }

    // Construct the shoutout message
    const shoutoutMessage = `Shoutout to ${user}! Check out their channel at https://www.twitch.tv/${user}`;
    
    // Send the shoutout message in the chat
    chatClient.say(channel, shoutoutMessage);
}
export default function subscribeEvent(channel, user, subInfo, msg, chatClient) {
    console.log(`User ${user} has subscribed to ${channel}. Sub info:`, subInfo);
    chatClient.say(channel, `kazuki25Pet Thank you @${user} for subscribing! Welcome to the community! kazuki25Wave`);
}
// This event is fired when the channel gains a subscriber!
// Once again, I'll do some proper logic here later, but for now, just a placeholder to see how it works.

export default function resubscribeEvent(channel, user, subInfo, msg, chatClient) {
    console.log(`User ${user} has subscribed to ${channel}. Sub info:`, subInfo);
    chatClient.say(channel, `kazuki25Pet Thank you @${user} for subscribing! They've been subscribed for ${subInfo.months}! kazuki25Wave`);
}
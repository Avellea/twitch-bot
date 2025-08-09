// Roll the dice! Some people like using this for random events.

export default function rollCommand(user, channel, chatClient) {
    const roll = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
    chatClient.say(channel, `${user} rolled a ${roll}!`);
}
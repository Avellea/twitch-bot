// Just a basic coin flip command. Can be used for bets or decisions I guess?

export default function coinflipCommand(channel, user, chatClient) {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    chatClient.say(channel, `${user}, you flipped a coin and got: ${result}`);
}
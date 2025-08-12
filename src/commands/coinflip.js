export default function coinflipCommand(channel, user, chatClient) {
    // Generate a random number between 0 and 1
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

    // Send the result to the chat
    chatClient.say(channel, `${user}, you flipped a coin and got: ${result}`);
}
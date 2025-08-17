// As this bot is developed for a cat-themed VTuber in mind, we need the obvious RP command to give "headpats".

export default function headpatCommand(user, targetUser, channel, chatClient) {

    if (targetUser.charAt(0) === '@') {
        targetUser = targetUser.slice(1);
    }

    const headpatMessage = `/me ${user} gave headpats to ${targetUser}! kazuki25Pet`
    chatClient.say(channel, headpatMessage);
    
}
import globals from '../util/global.js';

function getStatus() {
    // Logic to get the current status of the bot
    // return { status: botStatus, message: "Bot is currently not running." };
    if(globals.botStatus === 0) {
        return { status: "0", message: "Bot is currently not running." };
    } else {
        return { status: "1", message: "Bot is currently running." };
    }
}

export default getStatus;
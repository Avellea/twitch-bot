import { disconnect } from '../util/connect.js';

function disableBot() {
    return disconnect();
    // console.log("Bot disabled.");
}

export default disableBot;
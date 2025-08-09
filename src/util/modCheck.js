// Name should make this clear what it is...
// This file checks if a user is a moderator or broadcaster in the Twitch chat.
// It returns true if the user is a mod or broadcaster, false otherwise.

export default function modCheck(user, msg) {
    var isMod = msg.userInfo.isMod || msg.userInfo.isBroadcaster;
    console.log(`User ${user} modcheck returned ${isMod}`);
    return isMod;
}

    
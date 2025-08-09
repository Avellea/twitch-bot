/* 
    Turns out browser extensions (7tv in this case) insert a null character (U+E0000) into chat messages
    to bypass Twitch chat spam filters. This function removes those characters from the message.
    See: https://stackoverflow.com/questions/6240055/how-to-remove-invisible-characters-in-javascript
*/

export default function removeUnicodeChar(str) {
    return str.replace(/\s*\u{e0000}\s*/gu, '');
}
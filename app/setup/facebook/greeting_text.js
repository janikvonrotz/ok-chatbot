import { Setup } from '../../connectors';
import I18n from '../../I18n';

let text = I18n('message_greeting_text');

Setup.setGreetingText(text, (error, response, body) => {
    if(error) {
        console.log("Greeting text failed", error);
    } else {
        console.log("Greeting text updated", response.statusCode, body);
    }
});

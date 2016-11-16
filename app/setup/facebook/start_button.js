import { Setup } from '../../connectors';
import I18n from '../../I18n';

let callToActions = [
    {
        "payload":"welcome_deal"
    }
];

Setup.setStartButton(callToActions, (error, response, body) => {
    if(error) {
        console.log("Persistent menu failed", error);
    } else {
        console.log("Persistent menu updated", response.statusCode, body);
    }
});

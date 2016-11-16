import { Setup } from '../../connectors';
import I18n from '../../I18n';

let callToActions = [
    {
        "type":"postback",
        "title": I18n('button_show_deals'),
        "payload":"show_deals"
    },
    {
        "type":"postback",
        "title": I18n('button_show_my_deals'),
        "payload":"show_my_deals"
    },
    {
        "type":"postback",
        "title": I18n('button_help'),
        "payload":"help"
    },
    {
        "type":"postback",
        "title": I18n('button_nofifications'),
        "payload":"notifications"
    },
    {
        "type":"postback",
        "title": I18n('button_talk_to_human'),
        "payload":"human"
    },

];

Setup.setPersistentMenu(callToActions, (error, response, body) => {
    if(error) {
        console.log("Persistent menu failed", error);
    } else {
        console.log("Persistent menu updated", response.statusCode, body);
    }
});

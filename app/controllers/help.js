import I18n from '../I18n';

export default (bot, message) => {
    var attachment = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": I18n('ctlr_help'),
                "buttons": [
                    {
                        "type": "postback",
                        "title": I18n('button_show_deals'),
                        "payload": "show_deals"
                    },
                    {
                        "type": "postback",
                        "title": I18n('button_show_my_deals'),
                        "payload": "show_my_deals"
                    },
                    {
                        "type": "postback",
                        "title": I18n('button_instructions'),
                        "payload": "instructions"
                    },
                ]
            }
        }
    };
    bot.reply(message, attachment);
};

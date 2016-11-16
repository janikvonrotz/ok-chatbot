import I18n from '../I18n';

export default (bot, message) => {
    let attachment = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": I18n('ctrl_unknown.sorry').replace('{firstName}', message.mongoUser.firstName),
                "buttons": [
                    {
                        "type": "postback",
                        "title": I18n('button_show_deals'),
                        "payload": "show_deals"
                    },
                    {
                        "type": "postback",
                        "title": I18n('button_instructions'),
                        "payload": "instructions"
                    },
                    {
                        "type": "postback",
                        "title": I18n('button_talk_to_human'),
                        "payload": "human"
                    }
                ]
            }
        }
    };
    bot.reply(message, attachment);
};

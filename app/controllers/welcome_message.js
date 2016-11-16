import { Users, Deals, Categories, Profile } from '../connectors';
import I18n from '../I18n';

export default (bot, message) => {
    Categories.findOne({label: 'Welcome Deal'}, (error, category) => {
        if(error) {
            console.log(error);
            bot.reply(message, I18n('message_error'));
        }
        let attachment = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": I18n('crtrl_welcome_message.hello').replace('{firstName}', message.mongoUser.firstName),
                    "buttons": [
                        {
                            "type": "postback",
                            "title":  I18n('button_welcome_deal'),
                            "payload": `show_deals_by_category-${category._id}`
                        },
                        {
                            "type": "postback",
                            "title":  I18n('button_instructions'),
                            "payload": "instructions"
                        },
                        {
                            "type": "postback",
                            "title": I18n('button_talk_to_human'),
                            "payload": "human"
                        },
                    ]
                }
            }
        };
        bot.reply(message, attachment);
    });
};

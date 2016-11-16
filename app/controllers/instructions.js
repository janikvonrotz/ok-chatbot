import I18n from '../I18n';
import { createCategoryReplies, getCountedCategories } from '../templates';

export default (bot, message) => {
    let promise = getCountedCategories();
    promise.then((categories) => {
        let quick_replies = createCategoryReplies(categories);
        if(quick_replies.length !== 0) {
            let quick_reply = {
                "text": I18n('quick_reply_checkout_deals'),
                "quick_replies": quick_replies
            };
            bot.startConversation(message, (error, convo) => {
                convo.say(I18n('ctrl_instruction.line_1').replace('{firstName}', message.mongoUser.firstName));
                convo.say(I18n('ctrl_instruction.line_2'));
                convo.say(I18n('ctrl_instruction.line_3'));
                convo.say(quick_reply);
          });
        } else {
            bot.reply(message, I18n('message_no_deals_available'));
        }
    });
    promise.catch((error) => {
        console.log(error);
        bot.reply(message, I18n('message_error'));
    });
};

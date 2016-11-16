import { createCategoryReplies, getCountedCategories } from '../templates';
import I18n from '../I18n';

export default (bot, message) => {
    let promise = getCountedCategories();
    promise.then((categories) => {
        let quick_replies = createCategoryReplies(categories);
        if(quick_replies.length !== 0) {
            let quick_reply = {
                "text": I18n('quick_reply_chose_category'),
                "quick_replies": quick_replies
            };
            bot.reply(message, quick_reply);
        } else {
            bot.reply(message, I18n('message_no_deals_available'));
        }
    });
    promise.catch((error) => {
        console.log(error);
        bot.reply(message, I18n('message_error'));
    });
};

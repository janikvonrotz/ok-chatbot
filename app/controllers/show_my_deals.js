import { getDealsById, createCategoryReplies, getCountedCategories,
  createDealCards } from '../templates';
import I18n from '../I18n';

export default (bot, message) => {
    let user = message.mongoUser;
    if(user === null) {
        bot.reply(message, I18n('message_error'));
    } else {
        let promise = getDealsById(user.savedDeals);
        promise.then((savedDeals) => {
            if(savedDeals.length !== 0) {
                let attachment = createDealCards(savedDeals, "redeem", "delete");
                bot.reply(message, I18n('ctrl_show_my_deals.your_saved_deals'));
                bot.reply(message, attachment);
            } else {
                bot.startConversation(message, (error, convo) => {
                    convo.say(I18n('ctrl_show_my_deals.no_deals_saved'));
                    let getCatPromise = getCountedCategories();
                    getCatPromise.then((categories) => {
                        let quick_replies = createCategoryReplies(categories);
                        if(quick_replies.length !== 0) {
                            let quick_reply = {
                                "text": I18n('ctrl_show_my_deals.add_deals'),
                                "quick_replies": quick_replies
                            };
                            convo.say(quick_reply);
                        } else {
                            convo.say(I18n('message_no_deals_available'));
                        }
                    });
                    getCatPromise.catch((error) => {
                        console.log(error);
                        convo.say(I18n('message_error'));
                    });
                });

            }
        });
        promise.catch((error) => {
            console.log(error);
            bot.reply(message, I18n('message_error'));
        });
    }
};

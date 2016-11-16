import { Deals, Categories } from '../connectors';
import I18n from '../I18n';
import { createCategoryReplies, getCountedCategories, createDealCards } from '../templates';

export default (bot, message) => {
    let matchPromise = new Promise((resolve, reject) => {
        if(message.action !== undefined && message.entities !== undefined) {
            if(message.entities.Categories === 'Alle') {
                resolve({});
            } else {
                Categories.findOne({'label': message.entities.Categories}, (error, category) => {
                    if(error || category !== null && Object.keys(category).length === 0) {
                        bot.reply(message, I18n('message_error'));
                        console.log(error);
                    } else {
                        let match = {categoryId: category._id};
                        resolve(match);
                    }
                });
            }
        } else {
            let match = message.text.split('-')[1] !== 'all' ? {categoryId: message.text.split('-')[1]} : {};
            resolve(match);
        }
    });
    matchPromise.then((match) => {
        let now = new Date();
        let yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        match.publishAt = { $lt: now };
        match.expiresAt = { $gt: yesterday };

        Deals.find(match, (error, deals) => {
            if(error) {
                bot.reply(message, I18n('message_error'));
                console.log(error);
            } else {
                if (deals.length !== 0 ) {
                    bot.startConversation(message, (error, convo) => {
                        let getCatPromise = getCountedCategories();
                        getCatPromise.then((categories) => {
                            let quick_replies = createCategoryReplies(categories);

                            let attachment = createDealCards(deals, "save", "redeem");
                            convo.say(I18n('message_available_deals'));
                            convo.say(attachment);
                            if(quick_replies.length !== 0) {
                                let quick_reply = {
                                    "text": I18n('ctrl_delete_deal.save_new_deals'),
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
                } else {
                    bot.reply(message, I18n('message_no_deals_available'));
                }
            }
        });
    });
};

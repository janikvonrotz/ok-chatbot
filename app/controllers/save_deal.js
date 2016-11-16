import { Users, Deals } from '../connectors';
import I18n from '../I18n';
import { createCategoryReplies, getCountedCategories, getUser } from '../templates';


export default (bot, message) => {
    let dealId = message.text.split("-")[1];
    let now = new Date();
    let yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    let match = {
        _id: dealId,
        publishAt: { $lt: now },
        expiresAt: { $gt: yesterday }
    };
    Deals.findOne(match, (error, deal) => {
        if(error) {
            bot.reply(message, I18n('message_error'));
            console.log(error);
        } else {
            if(deal === null) {
                bot.reply(message, I18n('ctrl_save_deal.no_longer_valid'));
            } else {
                let user = message.mongoUser;
                if(user === null) {
                    bot.reply(message, I18n('message_error'));
                } else {
                    let updateUserPromise = new Promise((resolve, reject) => {
                        let index = user.savedDeals.indexOf(dealId);
                        if(index > -1) {
                            resolve(I18n('ctrl_save_deal.already_saved'));
                        } else {
                            user.savedDeals.push(dealId);
                            Users.update({_id: user.id}, { $set: { savedDeals: user.savedDeals}}, (error, response) => {
                                if(error) {
                                    reject(error);
                                } else {
                                    resolve(I18n('ctrl_save_deal.confirm_save_deal'));
                                }
                            });
                        }
                    });
                    updateUserPromise.then((answer) => {
                        let getCatPromise = getCountedCategories();
                        getCatPromise.then((categories) => {
                            let quick_replies = createCategoryReplies(categories);

                            bot.startConversation(message, (error, convo) => {
                                convo.say(answer);
                                if(quick_replies.length !== 0) {
                                    let quick_reply = {
                                        "text": I18n('ctrl_save_deal.save_more_deals'),
                                        "quick_replies": quick_replies
                                    };
                                    convo.say(quick_reply);
                                } else {
                                    convo.say(I18n('message_no_deals_available'));
                                }
                            });

                        });
                        getCatPromise.catch((error) => {
                            console.log(error);
                            bot.reply(message, I18n('message_error'));
                        });
                    });
                    updateUserPromise.catch((error) =>  {
                        console.log(error);
                        bot.reply(message, I18n('message_error'));
                    });
                }
            }
        }
    });
};

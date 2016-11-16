import { Deals } from '../connectors';
import I18n from '../I18n';
import { formatDate, concenateToPhrase } from '../helpers/functions';

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
            if(deal !== null) {
                let element = {
                    "title": deal.title,
                    "image_url": deal.qrImageUrl,
                    "subtitle": `${I18n('text_expires_at')} ${formatDate(deal.expiresAt)}`,
                };
                let attachment = {
                    "attachment":{
                        "type":"template",
                        "payload":{
                            "template_type":"generic",
                            "elements": [element]
                        }
                    }
                };
                bot.reply(message, I18n('ctrl_redeem_deal.show_barcode').replace('{pointOfSale}',
                concenateToPhrase(deal.pointOfSale, I18n('message_words.and'))));
                bot.reply(message, attachment);
            } else {
                bot.reply(message, I18n('ctrl_redeem_deal.no_longer_valid'));
            }
        }
    });
};

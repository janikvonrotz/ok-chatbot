import I18n from '../I18n';
import { formatDate } from '../helpers/functions';

const attachments = {}
attachments.createDealCards = (deals, ...methods) => {
    let elements = deals.map((deal) => {
        let buttons = methods.map((method) => {
            return {
                "type":"postback",
                "payload": `${method}_deal-${deal._id}`,
                "title": I18n(`button_${method}_deal`),
            };
        });
        return {
            "title": deal.title,
            "image_url": deal.imageUrl,
            "subtitle": `${I18n('text_expires_at')} ${formatDate(deal.expiresAt)}`,
            "buttons": buttons
        };
    });
    let attachment = {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"generic",
                "elements": elements
            }
        }
    };
    return attachment;
};

attachments.createButtons = (text, buttons) => {
  buttons = buttons.map((button) => {
    return {
      "type": "postback",
      "title":  button.title,
      "payload": button.payload
    }
  });
  
  return {
    "attachment": {
      "type": "template",
      "payload": {
          "template_type": "button",
          "text": text,
          "buttons": buttons
      }
    }
  }
}

export default attachments;

import I18n from '../I18n';

export default (bot, message) => {
    let attachment = {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": I18n('ctrl_next_location.text'),
                "buttons": [
                    {
                      "type":"web_url",
                      "url":"http://www.kkiosk.ch/de/allover/standortsuche/",
                      "title": I18n('ctrl_next_location.title'),
                      "webview_height_ratio": "full"
                    }
                ]
            }
        }
    };
    bot.reply(message, attachment);
};

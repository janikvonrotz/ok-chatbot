import I18n from '../I18n';

export default (bot, message) => {
    bot.reply(message, I18n('message_smile'));
};

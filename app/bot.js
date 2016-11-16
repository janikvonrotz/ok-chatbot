import Botkit from 'botkit';
import config from '../config';

const controller = Botkit.facebookbot({
    access_token: config.FACEBOOK.ACCESS_TOKEN,
    verify_token: config.FACEBOOK.VERIFY_TOKEN,
    debug: config.DEBUG
});

const bot = controller.spawn({});

export { bot, controller };

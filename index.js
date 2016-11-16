import { bot, controller } from './app/bot';
import Botkit from 'botkit';
import dashbot from 'dashbot';
import config from './config';
import notificationSchedule from './app/notification_schedule';
import { api_ai as apiai, facebook as facebook_middleware,
  user as user_middleware } from './app/middlewares';
import { delete_deal, hello, help, redeem_deal, save_deal, notifications, human, find,
  show_deals_by_category, show_deals, show_my_deals, unknown, welcome_message, instructions,
  thanks, sorry, smile, how_are_you, bye, next_location } from './app/controllers';

const nlp = apiai({
    token: config.API_AI_TOKEN
});

controller.hears([], ['message_received', 'facebook_postback'], user_middleware.hears, welcome_message);
controller.hears(['instructions'], ['message_received'], nlp.hears, instructions);
controller.hears(['^instructions$'], ['message_received', 'facebook_postback'], instructions);
controller.hears(['human'], ['message_received'], nlp.hears, human);
controller.hears(['human'], ['message_received', 'facebook_postback'], human);
controller.hears(['hello'], ['message_received'], nlp.hears, hello);
controller.hears(['help'], ['message_received', 'facebook_postback'], help);
controller.hears(['help'], ['message_received'], nlp.hears, help);
controller.hears(['^save_deal-'], ['message_received'], save_deal);
controller.hears(['^show_deals$'], ['message_received', 'facebook_postback'], show_deals);
controller.hears(['show_deals', 'save_deals'], ['message_received'], nlp.hears, show_deals);
controller.hears(['^show_deals_by_category-'], ['message_received', 'facebook_postback'], show_deals_by_category);
controller.hears(['show_deals_by_category'], ['message_received'], nlp.hears, show_deals_by_category);
controller.hears(['show_my_deals'], ['message_received', 'facebook_postback'], show_my_deals);
controller.hears(['show_my_deals', 'redeem_deals', 'delete_deals'], ['message_received'], nlp.hears, show_my_deals);
controller.hears(['^redeem_deal-'], ['message_received', 'facebook_postback'], redeem_deal);
controller.hears(['^delete_deal-'], ['message_received', 'facebook_postback'], delete_deal);
controller.hears(['^notifications'], ['message_received', 'facebook_postback'], notifications);
controller.hears(['^notifications'], ['message_received', 'facebook_postback'], nlp.hears, notifications);
controller.hears(['find_poke'], ['message_received', 'facebook_postback'], find);
controller.hears(['find_poke'], ['message_received', 'facebook_postback'], nlp.hears, find);
controller.hears(['thanks'], ['message_received'], nlp.hears, thanks);
controller.hears(['sorry'], ['message_received'], nlp.hears, sorry);
controller.hears(['smile'], ['message_received'], nlp.hears, smile);
controller.hears(['how_are_you'], ['message_received'], nlp.hears, how_are_you);
controller.hears(['bye'], ['message_received'], nlp.hears, bye);
controller.hears(['next_location'], ['message_received'], nlp.hears, next_location);


controller.hears(['.*'], ['message_received'], unknown);

controller.middleware.receive.use(user_middleware.receive);
controller.middleware.receive.use(facebook_middleware.receive);
controller.middleware.receive.use(nlp.receive);
if(config.DASHBOT_API_KEY){
  const analytics = dashbot(config.DASHBOT_API_KEY).facebook;
  controller.middleware.receive.use(analytics.receive);
  controller.middleware.send.use(analytics.send);
}

controller.setupWebserver(config.PORT,function(err,webserver) {
    controller.createWebhookEndpoints(controller.webserver, bot, function() {
        console.log('This bot is online and is gonna hurt your feelings!!!');
    });
});

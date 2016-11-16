import config from '../config';
import { Deals, Users } from './connectors';
import schedule from 'node-schedule';
import { bot } from './bot';
import { createDealCards, createButtons } from './templates';
import I18n from './I18n';

// var notificationTypes = []
// disabled: new_deals
var notificationTypes = ['saved_deals_expire']

// schedule the time in UTC 0
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    |
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

console.log('The time is: ', new Date());

// var date = new Date();
// date.setSeconds(date.getSeconds() + 5);
var date = ""
date = "0 30 5 * * *";

var job = schedule.scheduleJob(date, function(){

  ['saved_deals_expire'].map((notificationType) => {
    var start = new Date();
    start.setDate(start.getDate() + 5);
    start.setHours(0,0,0,0);
    var end = new Date();
    end.setDate(end.getDate() + 6);
    end.setHours(0,0,0,0);

    console.log(`Run notification batch for ${notificationType}`);
    console.log('Find users that have this notification type enabled...');

    Users.find({ enabledNotifications: notificationType }, (error, users) => {
      if(error){console.log(error)}
      console.log('Find deals that match the nofication type...');
      var notifications = {
        "saved_deals_expire": () => {
            Deals.find({ expiresAt: {$lt: end, $gte: start} }, (error, deals) => {
                if(error){console.log(error)}
                if(deals && (deals.length != 0)){
                    users.map((user) => {
                        var savedDeals = deals.filter((deal) => {return (user.savedDeals.indexOf(deal._id) > -1)});
                        if(savedDeals.length != 0){
                            bot.startConversation({channel: user.facebookId}, (error, convo) => {
                                convo.say(createButtons(I18n('ctlr_notifications.saved_deals_expire')
                                  .replace('{firstName}', user.firstName)
                                  .replace('{dealsCount}', savedDeals.length),
                                [{title: I18n('button_show_my_deals'), payload: 'show_my_deals'}]));
                                // convo.say(createDealCards(savedDeals, "redeem", "delete"));
                                convo.say(I18n('ctlr_notifications.saved_deals_profit'));
                                convo.say(createButtons(I18n('ctlr_notifications.manage_notifications'),
                                [{title: I18n('button_nofifications'), payload: 'notifications'}]));
                            });
                        }
                    });
                }
            });
        }
      }
      notifications[notificationType]();
    });
  });
});

// date.setSeconds(date.getSeconds() + 5);
date = "0 20 5 * * *";

var job = schedule.scheduleJob(date, function(){

  ['new_deals'].map((notificationType) => {
    var now = new Date();
    var yesterday = new Date();
    yesterday.setDate(now.getDate() -1);

    console.log(`Run notification batch for ${notificationType}`);
    console.log('Find users that have this notification type enabled...');

    Users.find({ enabledNotifications: notificationType }, (error, users) => {
      if(error){console.log(error)}
      console.log('Find deals that match the nofication type...');
      var notifications = {
        "new_deals": () => {
          Deals.find({ publishAt: {$lte: now, $gt: yesterday} }, (error, deals) => {
            if(error){console.log(error)}
            if(deals && (deals.length != 0)){
              users.map((user) => {
                  bot.startConversation({channel: user.facebookId}, (error, convo) => {
                      convo.say(I18n('ctlr_notifications.new_deals').replace('{firstName}', user.firstName));
                      convo.say(createDealCards(deals, "save", "redeem"));
                      convo.say(createButtons(I18n('ctlr_notifications.manage_notifications'),
                      [{title: I18n('button_nofifications'), payload: 'notifications'}]));
                  });
              });
            }
          });
        },
      }
      notifications[notificationType]();
    });
  });
});

import { Users } from '../connectors';
import I18n from '../I18n';
import { createButtons, getUser } from '../templates';

export default (bot, message) => {

  let getUserPromise = getUser(message.user);
  getUserPromise.then((user) => {

    function showNotificationMenu(user, convo){

      let notifications = ['saved_deals_expire', 'new_deals'];

      notifications.map((notification) => {

          let status = (user.enabledNotifications.indexOf(notification) > -1);
          let statusPayload = status ? 'disable' : 'enable';

          let buttons = [{
              title: status ? I18n('button_disable') : I18n('button_enable'),
              payload: `notifications_${notification}-${statusPayload}`
          }];

          let text = I18n('ctlr_notifications.mutate_status')
          .replace('{title}', I18n(`ctlr_notifications.${notification}_title`))
          .replace('{status}', !status ? I18n('message_disabled') : I18n('message_enabled'));

          convo.say(createButtons(text, buttons));
      });

      convo.say(createButtons(I18n('message_back_to_bot'), [{
          title: I18n('button_show_deals'),
          payload: 'show_deals'
      }]));
    }

    function updateNotifications(notification, user, convo){
        let status = !(user.enabledNotifications.indexOf(notification) > -1);
        console.log("status:", status, notification);

        if(status){
            user.enabledNotifications.push(notification);
        }else{
            user.enabledNotifications.splice(user.enabledNotifications.indexOf(notification), 1);
        }

        Users.update({_id: user.id}, { $set: { enabledNotifications: user.enabledNotifications}}, (error, response) => {
            if(error) {
                console.log(error);
                convo.say(I18n('message_error'));
                showNotificationMenu(user, convo);
            } else {
                convo.say(I18n('ctlr_notifications.mutation_saved'));
                showNotificationMenu(user, convo);
            }
        });
    }

    var intent = message.text;
    if(intent.indexOf('-') != -1){
        intent = intent.split('-')[0];
        var status = message.text.split('-')[1] === 'enabled' ? true : false;
    }

    bot.startConversation(message, (error, convo) => {

      if(intent === 'notifications'){
          convo.say(I18n('ctlr_notifications.menu_introduction'));
          showNotificationMenu(user, convo);
      }
      if(intent === 'notifications_saved_deals_expire'){
          updateNotifications('saved_deals_expire', user, convo);
      }
      if(intent === 'notifications_new_deals'){
          updateNotifications('new_deals', user, convo);
      }
    });
  });
  getUserPromise.catch((error) => {
      console.log(error);
      bot.reply(message, I18n('message_error'));
  });
};

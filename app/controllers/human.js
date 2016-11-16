import nodemailer from 'nodemailer';
import sg_transport from 'nodemailer-sendgrid-transport';
import config from '../../config';
import I18n from '../I18n';
import { createButtons } from '../templates';

export default (bot, message) => {

    bot.startConversation(message, function(error, convo) {
        convo.say(createButtons(I18n('ctrl_human.info'), [{
            title: I18n('button_back_to_bot'),
            payload: 'back_to_bot'
        }]));
        convo.ask(I18n('ctrl_human.ask'), [
            {
                pattern: 'back_to_bot',
                callback: (response, convo) => {
                    convo.say(I18n('ctrl_human.triggered'));
                    convo.next();
                }
            },
            {
                default: true,
                callback: (response,convo) => {
                    var options = {
                        auth: {
                            api_user: config.MAIL.USER,
                            api_key: config.MAIL.PASSWORD
                        }
                    };

                    var mailer = nodemailer.createTransport(sg_transport(options));

                    var email = {
                        to: [config.MAIL.TO],
                        from: config.MAIL.FROM,
                        subject: I18n('ctrl_human.subject'),
                        html: I18n('ctrl_human.text')
                            .replace("{link}", "https://www.facebook.com/okschweiz/messages/")
                            .replace("{firstName}", message.mongoUser.firstName)
                            .replace("{lastName}", message.mongoUser.lastName)
                            .replace("{message}", response.text)
                    };
                    mailer.sendMail(email, function(err, res) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    convo.ask(createButtons(I18n('ctrl_human.confirmation'), [{
                        title: I18n('button_back_to_bot'),
                        payload: 'back_to_bot'
                    }]), [
                        {
                            pattern: 'back_to_bot',
                            callback: (response, convo) => {
                                convo.say(I18n('ctrl_human.triggered'));
                                convo.next();
                            },
                        },
                        {
                            default: true,
                            callback: (response,convo) => {
                            }
                        }
                    ]);
                    convo.next();
                }
            }
        ]);
    });

};

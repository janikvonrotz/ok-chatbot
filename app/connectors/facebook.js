import request from 'request';
import config from '../../config';

const Profile = {};
Profile.get = (userId, callback) => {
    request({
        url: config.FACEBOOK.URL + userId,
        qs: {
            fields: 'first_name,last_name,gender',
            access_token: config.FACEBOOK.ACCESS_TOKEN},
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }, callback);
};

const Setup = {};
Setup.setGreetingText = (text, callback) => {
    request({
        url: config.FACEBOOK.URL + 'me/thread_settings',
        qs: {access_token: config.FACEBOOK.ACCESS_TOKEN},
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        json: {
            "setting_type":"greeting",
            "greeting": {
              "text": text
            }
        }
    }, callback);
};

Setup.setPersistentMenu = (callToActions, callback) => {
    request({
        url: config.FACEBOOK.URL + 'me/thread_settings',
        qs: {access_token: config.FACEBOOK.ACCESS_TOKEN},
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        json: {
            "setting_type":"call_to_actions",
            "thread_state":"existing_thread",
            "call_to_actions": callToActions
        }
    }, callback);
};

Setup.setStartButton = (callToActions, callback) => {
    request({
        url: config.FACEBOOK.URL + 'me/thread_settings',
        qs: {access_token: config.FACEBOOK.ACCESS_TOKEN},
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        json: {
            "setting_type":"call_to_actions",
            "thread_state":"new_thread",
            "call_to_actions": callToActions
        }
    }, callback);
};

export { Profile, Setup };

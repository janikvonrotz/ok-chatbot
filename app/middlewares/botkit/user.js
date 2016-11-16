import { getUser } from '../../templates';

export default (() => {

    const middleware = {};

    middleware.receive = function(bot, message, next) {
        let promise = getUser(message.user);
        promise.then((user) => {
            message.mongoUser = user;
            next();
        });
        promise.catch((error) => {
            console.log(error);
            message.mongoUser = null;
        });
    };

    middleware.hears = (test, message) => {
        if((message.mongoUser !== undefined && message.mongoUser.isNew) || (message.text !== undefined && message.text === 'welcome_deal')) {
            return true;
        }
        return false;
    };
    return middleware;
})();

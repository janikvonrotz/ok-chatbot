export default (() => {

    const middleware = {};

    middleware.receive = function(bot, message, next) {
        if(message.quick_reply && message.quick_reply.payload) {
            message.text = message.quick_reply.payload;
        }
        next();
    };

    return middleware;
})();

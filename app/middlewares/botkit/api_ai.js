import apiaiService from 'apiai';

export default (config) => {
    if (!config.token) {
        throw new Error('No api.ai token provided.');
    } else {
        var apiai = apiaiService(config.token);
    }

    config.minimum_confidence = config.minimum_confidence || 0.5;

    const middleware = {};

    middleware.receive = function(bot, message, next) {
        if(message.text && message.mid !== undefined & message.quick_reply === undefined) {
            let request = apiai.textRequest(message.text);

            request.on('response', function(response) {
                if(response.result.actionIncomplete) {
                    next();
                }
                message.intent = response.result.metadata.intentName;
                message.entities = response.result.parameters;
                message.fulfillment = response.result.fulfillment;
                message.confidence = response.result.score;
                message.action = response.result.action;
                message.nlpResponse = response;

                next();
            });



            request.on('error', function(error) {
                next(error);
            });

            request.end();
        } else {
            next();
        }
    };

    middleware.hears = function(tests, message) {
        for (var i = 0; i < tests.length; i++) {
            if (message.action === tests[i] &&
                message.confidence >= config.minimum_confidence) {
                return true;
            }
        }
        return false;
    };

    return middleware;
};

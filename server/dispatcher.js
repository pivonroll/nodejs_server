let Dispatcher = {
    members: {
        dispatcher: null
    },
    init() {
        let HttpDispatcher = require('httpdispatcher');
        Dispatcher.members.dispatcher = new HttpDispatcher();
        Dispatcher.members.dispatcher.onError(function(request, response) {
            console.log("Page not found. URL: " + request.url);
            response.writeHead(404);
            response.end();
        });
    },
    createWrapperRequestHandler(handlerFunction) {
        return function(request, response) {
            let body = '';
            // console.log("Processing " + request.method + " request");
            console.log("Request URL: " + request.url);
            // console.log("Header content: " + JSON.stringify(request.headers, null, 2));
            request.on('error', function(err) {
                console.error(err);
                response.statusCode = 400;
                response.end();
            }).on('data', function(chunk) {
                body += chunk;
                // Too much GET data, kill the connection!
                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                if (body.length > 1e6) {
                    request.connection.destroy();
                }
            }).on('end', function() {
                // At this point, we have the headers, method, url, params and body, and can now
                // do whatever we need to in order to respond to this request.
                try {
                    let respns = handlerFunction(body, request.params);
                    response.end(respns);
                } catch (error) {
                    console.error(error);
                    response.statusCode = 400;
                    response.end();
                }
            });
        }
    },
    addPath(path, onGetFunction, onPostFunction) {
        if (onGetFunction) {
            let onGetWrapperFunction = Dispatcher.createWrapperRequestHandler(onGetFunction);
            Dispatcher.members.dispatcher.onGet(path, onGetWrapperFunction);
        }

        if (onPostFunction) {
            let onPostWrapperFunction = Dispatcher.createWrapperRequestHandler(onPostFunction);
            Dispatcher.members.dispatcher.onPost(path, onPostWrapperFunction);
        }
    },
    dispatch(request, response) {
        Dispatcher.members.dispatcher.dispatch(request, response);
    }
};

module.exports = {
    init: Dispatcher.init,
    addPath: Dispatcher.addPath,
    dispatch: Dispatcher.dispatch
};

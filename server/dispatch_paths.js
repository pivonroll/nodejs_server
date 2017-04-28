var Dispatcher = require('./dispatcher.js');

function createOnGetHandlerFunction(handlerFunction) {
    return function(requestBody, requestParams) {
        return handlerFunction(requestBody, requestParams);
    }
}

function createOnPostHandlerFunction(handlerFunction) {
    return function(requestBody, requestParams) {
        return handlerFunction(requestBody, requestParams);
    }
}

let DispatcherPaths = {
    addPath(requestPath, onGetHandlerFunction, onPostHandlerFunction) {
        Dispatcher.addPath(requestPath, createOnGetHandlerFunction(onGetHandlerFunction), createOnPostHandlerFunction(onPostHandlerFunction));
    }
};

module.exports = {
    addPath: DispatcherPaths.addPath
};

var Dispatcher = require('./dispathcer.js');

let initialize = function(Dispatcher) {
    function createOnGetHandlerFunction(relativeFilePath) {
        return function(requestURL, requestBody, requestParams) {
            handlerFunction(requestBody, requestParams);
        }
    }

    function createOnPostHandlerFunction() {
        return function(requestURL, requestBody, requestParams) {
            handlerFunction(requestBody, requestParams);
        }
    }

    addPath(requestPath, onGetHandlerFunction, onPostHandlerFunction) {
        Dispatcher.addPath(requestPath, createOnGetHandlerFunction(onGetHandlerFunction), createOnPostHandlerFunction(onPostHandlerFunction));
    }
};

module.exports = {
    addPath: addPath
};

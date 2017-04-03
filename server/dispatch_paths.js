let initialize = function(Dispatcher) {
    function createResolveHandlerFunction(relativeFilePath) {
        return function(requestURL, requestBody) {
            var fs = require('fs');
            var file = fs.readFileSync(relativeFilePath);

            console.log("Request body: " + JSON.stringify(requestBody));

            return file;
        }
    }

    function createRejectHandlerFunction() {
        return function(requestBody) {
            console.log("Request body: " + JSON.stringify(requestBody));
            return 'Index Post Page';
        }
    }

    function addDispatcherPath(requestPath, relativeResourcePath) {
        Dispatcher.addPath(requestPath, createResolveHandlerFunction(relativeResourcePath), createRejectHandlerFunction());
    }

    addDispatcherPath("/", '../client/index.html');
    addDispatcherPath("/favicon.ico", '../favicon.ico');
    addDispatcherPath("/compiled/bundle.js", '../client/compiled/bundle.js');
    addDispatcherPath("/compiled/bundle.js.map", '../client/compiled/bundle.js.map');
    addDispatcherPath("/app/signin", '../client/app/index.html');
    addDispatcherPath("/app/compiled/bundle.js", '../client/app/compiled/bundle.js');
    addDispatcherPath("/app/some_script.js", '../client/app/some_script.js');
    addDispatcherPath("/app/another_script.js", '../client/app/another_script.js');
    addDispatcherPath("/app/favicon.ico", '../favicon.ico');
    addDispatcherPath("/app/main.css", '../client/app/main.css');
}

module.exports = {
    init: initialize
};

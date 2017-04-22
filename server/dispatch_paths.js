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

    var Settings = require('./settings.js');

    function addClientPath(url, relativeClientFilePath) {
        addDispatcherPath(url, Settings.clientFolderPath() + relativeClientFilePath)
    }

    addClientPath("/", 'index.html');
    addClientPath("/favicon.ico", '../favicon.ico');
    addClientPath("/compiled/bundle.js", 'compiled/bundle.js');
    addClientPath("/compiled/bundle.js.map", 'compiled/bundle.js.map');
    addClientPath("/app/signin", 'app/index.html');
    addClientPath("/app/compiled/bundle.js", 'app/compiled/bundle.js');
    addClientPath("/app/some_script.js", 'app/some_script.js');
    addClientPath("/app/another_script.js", 'app/another_script.js');
    addClientPath("/app/favicon.ico", '../favicon.ico');
    addClientPath("/app/main.css", 'app/main.css');
}

module.exports = {
    init: initialize
};

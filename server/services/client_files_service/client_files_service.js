let ClientFilesService = {
    function createOnGetHandlerFunction(relativeFilePath) {
        return function(requestBody, requestParams) {
            var fs = require('fs');
            var file = fs.readFileSync(relativeFilePath);

            console.log("Request params: " + JSON.stringify(requestParams, null, 2))
            console.log("Request body: " + JSON.stringify(requestBody, null, 2));

            return file;
        }
    }

    function createOnPostHandlerFunction() {
        return function(requestBody, requestParams) {
            console.log("Request params: " + JSON.stringify(requestParams, null, 2))
            console.log("Request body: " + JSON.stringify(requestBody, null, 2));
            return 'Index Post Page';
        }
    }

    members: {
        settings: null,
        config: null
    },

    addDispatcherPath(requestPath, relativeResourcePath) {
        ClientFilesService.members.dispatcherPaths.addPath(requestPath, createOnGetHandlerFunction(relativeResourcePath), createOnPostHandlerFunction());
    },

    clientFolderPath() {
        return ClientFilesService.members.settings.getApplicationPath() + ClientFilesService.members.config.ClientPath + "/";
    },

    addClientPath(url, relativeClientFilePath) {
        addDispatcherPath(url, ClientFilesService.clientFolderPath() + relativeClientFilePath)
    },

    initializePaths() {
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
    },

    init() {
        ClientFilesService.members.settings = require('../../settings.js');
        config = require('./config.js');
        ClientFilesService.members.settings.addConfigSection('clientConfig', config);
        ClientFilesService.members.config = config;
        ClientFilesService.members.dispatcherPaths = require('../../dispatch_paths.js');
        ClientFilesService.initializePaths();
    }
};

module.exports = {
    init : init
};

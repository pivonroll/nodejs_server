function createOnGetHandlerFunction(relativeFilePath) {
    return function(requestBody, requestParams) {
        let fs = require('fs');
        let file = fs.readFileSync(relativeFilePath);

        // console.log("Request params: " + JSON.stringify(requestParams, null, 2))
        return file;
    }
}

function createOnPostHandlerFunction() {
    return function(requestBody, requestParams) {
        // console.log("Request params: " + JSON.stringify(requestParams, null, 2))
        return 'Index Post Page';
    }
}

let ClientFilesService = {
    members: {
        settings: null,
        config: null
    },

    addDispatcherPath(requestPath, relativeResourcePath) {
        ClientFilesService.members.dispatcherPaths.addPath(requestPath, createOnGetHandlerFunction(relativeResourcePath), createOnPostHandlerFunction());
    },

    getcurrentPath() {
        return ClientFilesService.members.settings.getApplicationPath() + 'services/client_files_service/'
    },

    clientFolderPath() {
        return ClientFilesService.members.settings.getApplicationPath() + ClientFilesService.members.config.ClientPath + "/";
    },

    addClientPath(url, relativeClientFilePath) {
        ClientFilesService.addDispatcherPath(url, ClientFilesService.clientFolderPath() + relativeClientFilePath)
    },

    initializePaths() {
        ClientFilesService.addClientPath("/", 'index.html');
        ClientFilesService.addClientPath("/favicon.ico", '../favicon.ico');
        ClientFilesService.addClientPath("/compiled/bundle.js", 'compiled/bundle.js');
        ClientFilesService.addClientPath("/compiled/bundle.js.map", 'compiled/bundle.js.map');
        ClientFilesService.addClientPath("/app/signin", 'app/index.html');
        ClientFilesService.addClientPath("/app/compiled/bundle.js", 'app/compiled/bundle.js');
        ClientFilesService.addClientPath("/app/some_script.js", 'app/some_script.js');
        ClientFilesService.addClientPath("/app/another_script.js", 'app/another_script.js');
        ClientFilesService.addClientPath("/app/favicon.ico", '../favicon.ico');
        ClientFilesService.addClientPath("/app/main.css", 'app/main.css');
    },

    loadConfigFile(filePath) {
        let fs = require('fs');
        let file = fs.readFileSync(filePath, 'utf8');
        let config = JSON.parse(file);
        return config;
    },

    init() {
        ClientFilesService.members.settings = require('../../settings.js');
        let config = ClientFilesService.loadConfigFile(ClientFilesService.getcurrentPath() + 'config.js')
        ClientFilesService.members.settings.addConfigSection('clientConfig', config);
        ClientFilesService.members.config = config;
        ClientFilesService.members.dispatcherPaths = require('../../dispatch_paths.js');
        ClientFilesService.initializePaths();
    }
};

module.exports = {
    init : ClientFilesService.init
};

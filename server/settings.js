let Settings = {
    members : {
        applicationPath: null,
        config: null
    },
    init() {
        var Path = require('path');
        Settings.members.applicationPath = Path.dirname(process.mainModule.filename) + "/";

        Settings.members.config = require('./config.js');
    },
    clientFolderPath() {
        return Settings.members.applicationPath + Settings.members.config.ClientPath + "/";
    }
}

module.exports = {
    init: Settings.init,
    applicationPath: Settings.applicationPath,
    clientFolderPath: Settings.clientFolderPath
};

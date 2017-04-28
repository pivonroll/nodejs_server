let Settings = {
    members : {
        applicationPath: null,
        config: {},
        dispatcherPaths: null
    },
    init() {
        var Path = require('path');
        Settings.members.applicationPath = Path.dirname(process.mainModule.filename) + "/";
    },
    addConfigSection(sectionName, sectionSettingsObject) {
        if (Settings.members.config.hasOwnProperty(sectionName)) {
            console.error;
        }
        Settings.members.config[sectionName] = sectionSettingsObject;
    },
    getConfigSection(sectionName) {
        return Settings.members.config[sectionName];
    },
    removeConfigSection(sectionName) {
        if (Settings.members.config.hasOwnProperty(sectionName)) {
            delete Settings.members.config;
        }
    },
    getApplicationPath() {
        return Settings.members.applicationPath;
    }
}

module.exports = {
    init: Settings.init,
    getApplicationPath: Settings.getApplicationPath,
    addConfigSection: Settings.addConfigSection,
    getConfigSection: Settings.getConfigSection,
    removeConfigSection: Settings.removeConfigSection
};

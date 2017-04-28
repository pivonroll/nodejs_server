let Server = {
    constants: {
        PORT: null
    },
    members: {
        httpServer: null,
        requestHandler: null
    },
    startIfPortIsAvailable() {
        if (!Server.constants.PORT) {
            throw 'Server port is not set';
        }

        let net = require('net');
        let tempServer = net.createServer();

        tempServer.once('error', function(err) {
            if (err.code === 'EADDRINUSE') {
                throw 'Port: ' + Server.constants.PORT + ' is already in use';
            }
        });

        tempServer.once('listening', function() {
            tempServer.close(); // close temp server
            Server.startServer();
        });

        tempServer.listen(Server.constants.PORT); // start a temp server
    },
    handleRequest(request, response) {
        try {
            Server.members.requestHandler(request, response);
        } catch (error) {
            console.error(error);
        }
    },
    startServer() {
        if (!Server.members.requestHandler) {
            throw 'HttpRequestHandlerNoSet';
        }

        //Create a server
        let http = require('http');
        Server.members.httpServer = http.createServer(Server.handleRequest);

        //Lets start our server
        Server.members.httpServer.listen(Server.constants.PORT, function() {
            //Callback triggered when server is successfully listening. Hurray!
            console.log("Server started on: http://localhost:%s", Server.constants.PORT);
        });
    },
    start(port) {
        let Dispatcher = require('./dispatcher.js');
        let DispatcherPaths = require('./dispatch_paths.js');
        let ClientFilePaths = require('./services/client_files_service/client_files_service.js')
        Dispatcher.init();
        ClientFilePaths.init();

        Server.setPort(port);
        Server.setRequestHandler(Dispatcher.dispatch);
        Server.startIfPortIsAvailable();
    },
    setRequestHandler(requestHandler) {
        Server.members.requestHandler = requestHandler;
    },
    setPort(port) {
        Server.constants.PORT = port;
    }
};

module.exports = {
    start: Server.start
};

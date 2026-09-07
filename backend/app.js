const express = require('express');
const cors = require('cors');
const app = express();

const fs = require('fs');
const http = require('http');

let endpoints = [];

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    //credentials : true
};

app.use(cors(corsOptions));
app.use(express.json());       // to support JSON-encoded bodies

fs.readdir('./endpoints/', (err, folders) => {
    folders.forEach(folder => {
        fs.readdir(`./endpoints/${folder}`, (err, files) => {
            files.forEach(file => {
                if (file === 'controller.js') {
                    const endpoints = require(`./endpoints/${folder}/controller.js`);
                    endpoints.forEach(endpoint => {
                        registerEndpoint(folder, endpoint);
                    })
                }
            });
        });
    });
});

function registerEndpoint(path, endpoint) {
    const method = endpoint.method;
    const fullPath = `/${path}${endpoint.path}`;
    if (!endpoints[method]) endpoints[method] = [];
    endpoints[method][fullPath] = endpoint;
}

app.route('*').all(function (req, res) {
    res.send(requestHandler(req));
});

function requestHandler(request) {
    const method = request.method.toLowerCase();
    const endpoint = endpoints[method][request._parsedUrl.pathname];
    if (!endpoint) return [];
    return endpoint.function(request);
}

http.createServer(app).listen(4001, function () {
    console.log('Server gestartet auf Port 4001!');
});

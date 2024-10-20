"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const server = (0, http_1.createServer)((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
});
server.listen(4000, () => {
    console.log('server is listening port 4000');
});

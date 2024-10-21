"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBody = void 0;
const getBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            resolve(body);
        });
        req.on('error', (err) => {
            reject('');
        });
    });
};
exports.getBody = getBody;

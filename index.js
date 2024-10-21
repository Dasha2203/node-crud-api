"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const DataBase_1 = require("./db/DataBase");
const uuid_1 = require("uuid");
const getBody_1 = require("./libs/getBody");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5555;
const db = new DataBase_1.DataBase();
const headers = {
    'Content-type': 'application/json'
};
const server = (0, http_1.createServer)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const method = req.method;
    if (method === 'PUT' && ((_a = req.url) === null || _a === void 0 ? void 0 : _a.includes('/api/users'))) {
        const partsPath = req.url.split('/').filter(i => !!i);
        if (partsPath.length === 3) {
            const userId = partsPath[2];
            if (!(0, uuid_1.validate)(userId)) {
                res.writeHead(400, headers);
                res.end(JSON.stringify({ message: `${userId} is invalid` }));
                return;
            }
            const user = db.findUser(userId);
            if (!user) {
                res.writeHead(404, headers);
                res.end(JSON.stringify({ message: `${userId} didn't find` }));
                return;
            }
            const body = yield (0, getBody_1.getBody)(req);
            const data = JSON.parse(body);
            if (!data.username || !data.age || !Array.isArray(data.hobbies)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Incorrect data format' }));
                return;
            }
            const updatedUser = {
                id: userId,
                username: data.username,
                age: data.age,
                hobbies: data.hobbies,
            };
            db.updateUser(updatedUser);
            res.writeHead(200, headers);
            res.end(JSON.stringify(updatedUser));
            return;
        }
    }
    if (method === 'GET') {
        if ((_b = req.url) === null || _b === void 0 ? void 0 : _b.includes('/api/users')) {
            const partsPath = req.url.split('/').filter(i => !!i);
            if (partsPath.length === 3) {
                const userId = partsPath[2];
                if (!(0, uuid_1.validate)(userId)) {
                    res.writeHead(400, headers);
                    res.end(JSON.stringify({ message: `${userId} is invalid` }));
                    return;
                }
                const user = db.findUser(userId);
                if (!user) {
                    res.writeHead(404, headers);
                    res.end(JSON.stringify({ message: `${userId} didn't find` }));
                    return;
                }
                res.writeHead(200, headers);
                res.end(JSON.stringify(user));
                return;
            }
            const users = db.getUsers();
            res.writeHead(200, headers);
            res.end(JSON.stringify(users));
            return;
        }
    }
    if (req.method === 'POST' && ((_c = req.url) === null || _c === void 0 ? void 0 : _c.includes('/api/users'))) {
        const body = yield (0, getBody_1.getBody)(req);
        const data = JSON.parse(body);
        if (!data.username || !data.age || !Array.isArray(data.hobbies)) {
            res.writeHead(400, headers);
            res.end(JSON.stringify({ message: 'Incorrect data format' }));
            return;
        }
        const newUser = {
            id: (0, uuid_1.v4)(),
            username: data.username,
            age: data.age,
            hobbies: data.hobbies
        };
        db.addUser(newUser);
        res.writeHead(200, headers);
        res.end(JSON.stringify(newUser));
        return;
    }
    if (req.method === 'DELETE' && ((_d = req.url) === null || _d === void 0 ? void 0 : _d.includes('/api/users'))) {
        const partsPath = req.url.split('/').filter(i => !!i);
        const userId = partsPath[2];
        if (!(0, uuid_1.validate)(userId)) {
            res.writeHead(400, headers);
            res.end(JSON.stringify({ message: `${userId} is invalid` }));
            return;
        }
        const user = db.findUser(userId);
        if (!user) {
            res.writeHead(404, headers);
            res.end(JSON.stringify({ message: `${userId} didn't find` }));
            return;
        }
        db.deleteUser(userId);
        res.writeHead(204, headers);
        res.end();
        return;
    }
    res.writeHead(404, headers);
    res.end(JSON.stringify({
        message: `The path ${req.url} didn't find`,
    }));
}));
server.listen(PORT, () => {
    console.log(`server is listening port ${PORT}`);
});

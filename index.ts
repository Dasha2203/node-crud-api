import { createServer } from 'http';
import { DataBase } from './db/DataBase';
import { v4 as uuidv4, validate } from 'uuid';
import { getBody } from './libs/getBody';
import { User } from './types/user';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5555;
const db = new DataBase();
const headers = {
  'Content-type': 'application/json'
}

const server = createServer(async (req, res) => {
  try {
    const method = req.method;

    if (method === 'PUT' && req.url?.includes('/api/users')) {
      const partsPath = req.url.split('/').filter(i => !!i);

      if (partsPath.length === 3) {
        const userId = partsPath[2];

        if (!validate(userId)) {
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

        const body = await getBody(req);
        const data = JSON.parse(body);

        if (!data.username || !data.age || !Array.isArray(data.hobbies)) {
          res.statusCode = 400;
          res.end(JSON.stringify({ message: 'Incorrect data format' }));

          return;
        }

        const updatedUser: User = {
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
      if (req.url?.includes('/api/users')) {
        const partsPath = req.url.split('/').filter(i => !!i);

        if (partsPath.length === 3) {
          const userId = partsPath[2];

          if (!validate(userId)) {
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

    if (req.method === 'POST' && req.url?.includes('/api/users')) {
      const body = await getBody(req);
      const data = JSON.parse(body);

      if (!data.username || !data.age || !Array.isArray(data.hobbies)) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ message: 'Incorrect data format' }));
        return;
      }

      const newUser: User = {
        id: uuidv4(),
        username: data.username,
        age: data.age,
        hobbies: data.hobbies
      }

      db.addUser(newUser);
      res.writeHead(200, headers);
      res.end(JSON.stringify(newUser));

      return;
    }

    if (req.method === 'DELETE' && req.url?.includes('/api/users')) {
      const partsPath = req.url.split('/').filter(i => !!i);

      const userId = partsPath[2];

      if (!validate(userId)) {
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
    }))

  } catch(err) {
    res.writeHead(500, headers);
    res.end(JSON.stringify({
      message: 'There was an error on the server'
    }))
  }
  
})

server.listen(PORT, () => {
  console.log(`server is listening port ${PORT}`)
});

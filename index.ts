import { createServer } from 'http';

const server = createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  })
})

server.listen(4000, () => {
  console.log('server is listening port 4000')
})


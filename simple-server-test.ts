import * as http from 'http';

// Create a simple server to test if the port is accessible
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Server is running', status: 'success' }));
});

server.listen(3002, () => {
  console.log('Test server running on port 3002');
  console.log('Try accessing http://localhost:3002/users in your browser');
});
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Construct the file path from the requested URL
  const filePath = path.join(__dirname, req.url);

  // Check if the file exists
  fs.exists(filePath, (exists) => {
    if (exists) {
      // If the file exists, read it and send it as the response body
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end(`Error reading file: ${err}`);
        } else {
          res.setHeader('Content-Type', 'application/octet-stream');
          res.end(data);
        }
      });
    } else {
      // If the file does not exist, return a 404 Not Found error
      res.statusCode = 404;
      res.end('File not found');
    }
  });
});

const port = 7000;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const http = require("http");
const expressApp = require("./app");

const SERVER_PORT = 8000;

async function startServer() {
  const server = http.createServer(expressApp);

  server.listen(SERVER_PORT, ()=> {
    console.log(`Server is running on port ${SERVER_PORT}`);
  });

}

startServer();
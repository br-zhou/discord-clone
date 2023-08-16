const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const { router: apiRoutes } = require("./routes/api.js");
const createSocket = require("./socketServer.js");

const PORT = 7999 || process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);
const httpServer = createServer(app);
createSocket(httpServer);

httpServer.listen(PORT);
console.log(`Server initalized on port ${PORT}`);

require('dotenv').config();
const { createServer } = require("http");
const express = require("express");
const cors = require("cors");
const { router: apiRoutes } = require("./routes/api.js");
const createSocket = require("./socket/server.js");

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);

const httpServer = createServer(app);
createSocket(httpServer);

httpServer.listen(PORT);
console.log(`Server initalized on port ${PORT}`);

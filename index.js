import express from "express";
import { dbConnection } from "./utils/dbConnection.js";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { apiRoutes } from "./routes/index.routes.js";
import http from "http";
import { setupSocket } from "./socket.js";

const app = express();
const server = http.createServer(app);

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

apiRoutes(app);
dbConnection();

setupSocket(server); // Setup Socket.io

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

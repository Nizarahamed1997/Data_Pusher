import express from "express";
import axios from "axios";
import { logger } from "./src/log/logger";
import { AddressInfo } from "net";
import { environment } from "./environment/environment";
import dataSource from "./src/datasource/datasource";
const app = express();
let cors = require("cors");
app.use(cors());
app.use(express.json());

let PORT = environment.PORT;
let datasourceRoutes = dataSource.getRoute();
app.get("/api", (req, res) => {
  res.json({
    status: "success",
    message: "connected",
  });
});

app.use("/api", datasourceRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    code: 404,
    status: "failed",
    message: "Page Not Found",
  });
});

let server = app.listen(PORT, function () {
  var { address, port } = server.address() as AddressInfo;
  logger.log("debug", "running at http://" + address + ":" + port);
});

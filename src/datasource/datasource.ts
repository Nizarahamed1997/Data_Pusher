import express from "express";
import { accounts } from "./accounts";
import { destinations } from "./destinations";
import { dataHandler } from "./dataHandler";

class DataSource {
  dataSourceRouter;
  constructor() {
    this.dataSourceRouter = express.Router();
    this.initialize();
  }

  initialize() {
    this.dataSourceRouter.use("/accounts", accounts.getRoute());
    this.dataSourceRouter.use("/destinations", destinations.getRoute());
    this.dataSourceRouter.use("/server", dataHandler.getRoute());
  }

  public getRoute() {
    return this.dataSourceRouter;
  }
}

const dataSource = new DataSource();
export default dataSource;

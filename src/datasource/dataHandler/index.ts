import express from "express";
import { logger } from "../../log/logger";
import { controller } from "./controller";

class DataHandler {
  router;
  constructor() {
    this.router = express.Router();
    this.initialize();
  }

  private initialize() {
    this.router.post("/incoming_data", async (req, res) => {
      try {
        const appSecretToken = req.headers["cl-x-token"];
        const data = req.body;
        console.log(data);

        // Check if the secret key is received

        let finalResponse = await controller.postDataViaQueryParams(
          appSecretToken,
          data
        );
        return res.send(finalResponse);
      } catch (error) {
        logger.log("error", JSON.stringify(error));
      }
    });
    this.router.post("/", async (req, res) => {
      try {
        let { email, accountName, website } = req.body;
        let finalResponse = await controller.insertNewAccount(
          email,
          accountName,
          website
        );
        return res.send(finalResponse);
      } catch (error) {
        logger.log("error", JSON.stringify(error));
      }
    });

    this.router.delete("/delete/:accountId", async (req, res) => {
      try {
        let accountId = req.params.accountId;
        await controller.deleteAccount(accountId);
        return res.send({ status: "Success", message: "Account Deleted" });
      } catch (error) {
        logger.log("error", JSON.stringify(error));
        return res.send(error);
      }
    });
  }

  public getRoute() {
    return this.router;
  }
}

export const dataHandler = new DataHandler();

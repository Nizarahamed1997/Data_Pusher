import express from "express";
import { logger } from "../../log/logger";
import { controller } from "./controller";

class Accounts {
  router;
  constructor() {
    this.router = express.Router();
    this.initialize();
  }

  private initialize() {
    this.router.get("/", async (req, res) => {
      try {
        let { accountId, accountName } = req.query;

        let finalResponse = await controller.getAccount(accountId, accountName);
        return res.send(finalResponse);
      } catch (error) {
        logger.log("error", JSON.stringify(error));
        return res.send({
          status: "failure",
          message: "Internal Server Error!!!",
        });
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
        return res.send({ status: "Success", message: "Account Created" });
      } catch (error) {
        logger.log("error", JSON.stringify(error));
        return res.send({
          status: "failure",
          message: "Internal Server Error!!!",
        });
      }
    });

    this.router.delete("/delete/:accountId", async (req, res) => {
      try {
        let accountId = req.params.accountId;
        await controller.deleteAccount(accountId);
        return res.send({ status: "Success", message: "Account Deleted" });
      } catch (error) {
        logger.log("error", JSON.stringify(error));
        return res.send({
          status: "failure",
          message: "Internal Server Error!!!",
        });
      }
    });
  }

  public getRoute() {
    return this.router;
  }
}

export const accounts = new Accounts();

import express from "express";
import { logger } from "../../log/logger";
import { controller } from "./controller";

class Destinations {
  router;
  constructor() {
    this.router = express.Router();
    this.initialize();
  }

  private initialize() {
    this.router.get("/", async (req, res) => {
      try {
        let { accountId } = req.query;

        let finalResponse = await controller.getDestination(accountId);
        return res.send(finalResponse);
      } catch (error) {
        logger.log("error", JSON.stringify(error));
      }
    });
    this.router.get("/:id", async (req, res) => {
      try {
        let id = req.params.id;

        let finalResponse = await controller.getDestinationData(id);
        return res.send(finalResponse);
      } catch (error) {
        logger.log("error", JSON.stringify(error));
      }
    });
    this.router.post("/:accountId", async (req, res) => {
      try {
        let accountId = req.params.accountId;
        let { url, method, headers } = req.body;
        let finalResponse = await controller.insertDestination(
          url,
          method,
          headers,
          accountId
        );
        return res.send({ status: "Success", message: "Destination Created" });
      } catch (error) {
        logger.log("error", JSON.stringify(error));
      }
    });

    this.router.delete("/delete/:destinationId", async (req, res) => {
      try {
        let destinationId = req.params.destinationId;
        await controller.deleteDestination(destinationId);
        return res.send({ status: "Success", message: "Destination Deleted" });
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

export const destinations = new Destinations();

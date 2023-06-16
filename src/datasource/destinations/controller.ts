import { logger } from "../../log/logger";
import { Utility } from "../../utility/database/mysql/Utility";
import { queryHelper } from "./queryBuilder/mysql";

class Controller {
  public getDestination(accountId?) {
    return new Promise(async (resolve, reject) => {
      try {
        let getDestinationQuery = queryHelper.getDestination(accountId);
        let getDestinationData = await Utility.databaseQuery(
          getDestinationQuery,
          "Get Destination Details"
        );
        for (let destination of getDestinationData[0]) {
          destination["headers"] = JSON.parse(destination["headers"]);
        }
        return resolve({
          status: "success",
          response: getDestinationData[0],
          totalCount: getDestinationData[1]["TotalCount"],
        });
      } catch (error) {
        logger.log("error", JSON.stringify(error));
        return reject(error);
      }
    });
  }
  public getDestinationData(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let getDestinationDataQuery = queryHelper.getDestinationData(id);
        let getDestinationData = await Utility.databaseQuery(
          getDestinationDataQuery,
          "Get Destination Details"
        );
        console.log(getDestinationData);
        for (let destination of getDestinationData) {
          destination["Data"] = JSON.parse(destination["Data"]);
        }
        return resolve({
          status: "success",
          response: getDestinationData,
        });
      } catch (error) {
        logger.log("error", JSON.stringify(error));
        return reject(error);
      }
    });
  }

  public insertDestination(url, method, headers, accountId) {
    return new Promise(async (resolve, reject) => {
      try {
        let getAccountQuery = queryHelper.getAccount();
        let getAccountData = await Utility.databaseQuery(
          getAccountQuery,
          "Get Account Details"
        );
        let idCheck = false;
        getAccountData[0].forEach((account) => {
          if (account.accountId == accountId) idCheck = true;
        });
        if (!idCheck) {
          return resolve({
            status: "failure",
            message: "Invalid Account",
          });
        }
        headers = JSON.stringify(headers);
        let insertDestinationQuery = queryHelper.insertDestination(
          url,
          method,
          headers,
          accountId
        );
        let insertDestinationData = await Utility.databaseQuery(
          insertDestinationQuery,
          "New Account Created"
        );
        return resolve(insertDestinationData);
      } catch (error) {
        logger.log("error", JSON.stringify(error));
        return reject(error);
      }
    });
  }

  public deleteDestination(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let deleteDestinationQuery = queryHelper.deleteDestination(id);
        let deleteDestinationData = await Utility.databaseQuery(
          deleteDestinationQuery,
          "Delete Destination"
        );
        return resolve(deleteDestinationData);
      } catch (error) {
        logger.log("error", JSON.stringify(error));
        return reject(error);
      }
    });
  }
}

export const controller = new Controller();

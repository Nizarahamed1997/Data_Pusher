import { resolve } from "path";
import { logger } from "../../log/logger";
import { Utility } from "../../utility/database/mysql/Utility";
import { queryHelper } from "./queryBuilder/mysql";
import axios from "axios";

class Controller {
  public postDataViaQueryParams(appSecretToken, data) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!appSecretToken) {
          return resolve({
            status: "failure",
            message: "Unauntheticated",
          });
        }
        let getAccountQuery = queryHelper.getAccount(appSecretToken);
        let getAccountData = await Utility.databaseQuery(
          getAccountQuery,
          "Get Account Details"
        );
        console.log(getAccountData);
        let accountId = getAccountData[0]["accountId"];
        let account = getAccountData[0]["appSecretToken"];
        if (!account) {
          return resolve({
            status: "failure",
            message: "Unauntheticated",
          });
        }
        let getDestinationQuery = queryHelper.getDestination(accountId);
        let getDestinationData = await Utility.databaseQuery(
          getDestinationQuery,
          "Get Destination Details"
        );
        console.log(getDestinationData);
        for (let destination of getDestinationData) {
          await this.sendDataToDestination(destination, data);
          let insertDataQuery = queryHelper.insertDestinationData(
            destination["destinationId"],
            JSON.stringify(data)
          );
          await Utility.databaseQuery(insertDataQuery, "inserting data");
        }
        return resolve({
          status: "success",
        });
      } catch (error) {
        logger.log("error", JSON.stringify(error));
        return reject(error);
      }
    });
  }

  public insertNewAccount(email, accountName, website?) {
    return new Promise(async (resolve, reject) => {
      try {
        let insertNewAccountQuery = queryHelper.insertNewAccount(
          email,
          accountName,
          website
        );
        let insertNewAccountData = "";
        try {
          insertNewAccountData = await Utility.databaseQuery(
            insertNewAccountQuery,
            "New Account Created"
          );
        } catch (error) {
          if (error == "ERR_DUPENTRY") {
            return resolve({
              status: "failure",
              message: "User already exist",
            });
          }
        }
        return resolve(insertNewAccountData);
      } catch (error) {
        logger.log("error", JSON.stringify(error));
        return reject(error);
      }
    });
  }

  public sendDataToDestination(destination, data) {
    return new Promise(async (resolve, reject) => {
      let { url, method, headers } = destination;
      headers = JSON.parse(headers);
      // if (method === "GET") {
      //   const queryParams = new URLSearchParams(data).toString();
      //   const fullUrl = `${url}?${queryParams}`;

      //   axios
      //     .get(fullUrl, { headers })
      //     .then((response) => {
      //       console.log(`Data sent to destination ${destination.id}`);
      //       console.log(response.data);
      //       return resolve("success");
      //     })
      //     .catch((error) => {
      //       console.error(
      //         `Error sending data to destination ${destination.id}:`,
      //         error
      //       );
      //       return reject(error);
      //     });
      // } else {
      axios({
        method,
        url,
        headers,
        data,
      })
        .then((response) => {
          console.log(`Data sent to destination ${destination.id}`);
          return resolve("success");
        })
        .catch((error) => {
          console.error(
            `Error sending data to destination ${destination.id}:`,
            error
          );
          return reject("error");
        });
      // }
    });
  }

  public deleteAccount(id) {
    return new Promise(async (resolve, reject) => {
      try {
        id = id.toLowerCase();
        let deleteAccountQuery = queryHelper.deleteAccount(id);
        let deleteAccountData = await Utility.databaseQuery(
          deleteAccountQuery,
          "Delete Account"
        );
        return resolve(deleteAccountData);
      } catch (error) {
        logger.log("error", JSON.stringify(error));
        return reject(error);
      }
    });
  }
}

export const controller = new Controller();

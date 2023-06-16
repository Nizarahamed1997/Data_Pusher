import { logger } from "../../log/logger";
import { Utility } from "../../utility/database/mysql/Utility";
import { queryHelper } from "./queryBuilder/mysql";

class Controller {
  public getAccount(accountId?, accountName?) {
    return new Promise(async (resolve, reject) => {
      try {
        let getAccountQuery = queryHelper.getAccount(accountId, accountName);
        let getAccountData = await Utility.databaseQuery(
          getAccountQuery,
          "Get Account Details"
        );
        return resolve({
          status: "success",
          response: getAccountData[0],
          totalCount: getAccountData[1]["TotalCount"],
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

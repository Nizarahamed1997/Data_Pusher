class QueryHelper {
  public insertDestination(url, method, headers, accountId) {
    let query = `INSERT INTO Destinations(Url,Method,Headers,FK_AccountId)
        VALUES('${url}','${method}',
        '${headers}',UNHEX(REPLACE("${accountId}","-","")));`;
    return query;
  }

  public getAccount(accountId?, accountName?) {
    let whereCondition = "IsActive = 1";
    if (accountId) {
      whereCondition += ` AND accountId = '${accountId}'`;
    }
    if (accountName) {
      whereCondition += ` AND ACC.Name = '${accountName}'`;
    }
    let query = `SELECT DISTINCT LOWER(CONCAT(LEFT(HEX(ACC.AccountId), 8), '-',MID(HEX(ACC.AccountId), 9, 4), 
    '-',MID(HEX(ACC.AccountId), 13, 4), '-',MID(HEX(ACC.AccountId), 17, 4), '-',
    RIGHT(HEX(ACC.AccountId), 12))) AS accountId,ACC.NAME AS accountName,ACC.Email AS email,LOWER(CONCAT(LEFT(HEX(ACC.AccountId), 8), '-',MID(HEX(ACC.AccountId), 9, 4), 
    '-',MID(HEX(ACC.AccountId), 13, 4), '-',MID(HEX(ACC.AccountId), 17, 4), '-',
    RIGHT(HEX(ACC.AccountId), 12))) AS appSecretId,ACC.Website AS website 
    FROM Accounts AS ACC
        WHERE ${whereCondition} ORDER BY ACC.InsertUtc DESC;
        SELECT COUNT(*) AS TotalCount FROM (
          SELECT DISTINCT ACC.AccountId
          FROM Accounts AS ACC
          WHERE ${whereCondition}) AS TBL;`;
    return query;
  }

  public getDestination(accountId?) {
    let whereCondition = "1";
    if (accountId) {
      whereCondition += ` AND accountId = '${accountId}'`;
    }
    let query = `SELECT DISTINCT DEST.Id AS destinationId,LOWER(CONCAT(LEFT(HEX(ACC.AccountId), 8), '-',MID(HEX(ACC.AccountId), 9, 4), 
    '-',MID(HEX(ACC.AccountId), 13, 4), '-',MID(HEX(ACC.AccountId), 17, 4), '-',
    RIGHT(HEX(ACC.AccountId), 12))) AS accountId,ACC.NAME AS accountName,DEST.Url AS url,
    DEST.Method AS httpMethod,DEST.Headers AS headers
    FROM Destinations AS DEST 
    LEFT JOIN Accounts AS ACC ON DEST.FK_AccountId = ACC.AccountId
        WHERE ${whereCondition};
        SELECT COUNT(*) AS TotalCount FROM (
          SELECT DISTINCT DEST.Id
          FROM Destinations AS DEST 
    LEFT JOIN Accounts AS ACC ON DEST.FK_AccountId = ACC.AccountId
          WHERE ${whereCondition}) AS TBL;`;
    return query;
  }
  public getDestinationData(id) {
    let query = `SELECT Data FROM Datas 
        WHERE Datas.FK_DestId = ${id};`;
    return query;
  }

  public deleteDestination(id) {
    let query = `DELETE FROM Destinations WHERE Id = ${id})`;
    return query;
  }
}

export const queryHelper = new QueryHelper();

class QueryHelper {
  public insertNewAccount(email, accountName, website?) {
    let query = `INSERT INTO Accounts(AccountId,Name,Email,AppSecretId,Website,IsActive)
        VALUES(UNHEX(REPLACE(UUID(),"-","")),"${accountName}","${email}",
        UNHEX(REPLACE(UUID(),"-","")),"${website}",1);`;
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
    RIGHT(HEX(ACC.AccountId), 12))) AS accountId,ACC.NAME AS accountName,ACC.Email AS email,LOWER(CONCAT(LEFT(HEX(ACC.AppSecretId), 8), '-',MID(HEX(ACC.AppSecretId), 9, 4), 
    '-',MID(HEX(ACC.AppSecretId), 13, 4), '-',MID(HEX(ACC.AppSecretId), 17, 4), '-',
    RIGHT(HEX(ACC.AppSecretId), 12))) AS appSecretId,ACC.Website AS website 
    FROM Accounts AS ACC
        WHERE ${whereCondition} ORDER BY ACC.InsertUtc DESC;
        SELECT COUNT(*) AS TotalCount FROM (
          SELECT DISTINCT ACC.AccountId
          FROM Accounts AS ACC
          WHERE ${whereCondition}) AS TBL;`;
    return query;
  }

  public deleteAccount(id) {
    let query = `UPDATE Accounts SET IsActive = 0 WHERE LOWER(CONCAT(LEFT(HEX(AccountId), 8), '-',MID(HEX(AccountId), 9, 4), 
    '-',MID(HEX(AccountId), 13, 4), '-',MID(HEX(AccountId), 17, 4), '-',
    RIGHT(HEX(AccountId), 12))) = '${id}'`;
    return query;
  }
}

export const queryHelper = new QueryHelper();

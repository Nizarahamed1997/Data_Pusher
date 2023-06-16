class QueryHelper {
  public insertNewAccount(email, accountName, website?) {
    let query = `INSERT INTO Accounts(AccountId,Name,Email,AppSecret,Website,IsActive)
        VALUES(UNHEX(REPLACE(UUID(),"-","")),'${accountName}','${email}',
        UNHEX(REPLACE(UUID(),"-","")),'${website}',1);`;
    return query;
  }
  public insertDestinationData(id, data) {
    let query = `INSERT INTO Datas(Data,FK_DestId) VALUES('${data}',${id})`;
    return query;
  }

  public getAccount(appSecretToken) {
    let whereCondition = `LOWER(CONCAT(LEFT(HEX(ACC.AppSecretId), 8), '-',MID(HEX(ACC.AppSecretId), 9, 4), 
    '-',MID(HEX(ACC.AppSecretId), 13, 4), '-',MID(HEX(ACC.AppSecretId), 17, 4), '-',
    RIGHT(HEX(ACC.AppSecretId), 12))) = '${appSecretToken}' AND IsActive = 1`;

    let query = `SELECT LOWER(CONCAT(LEFT(HEX(ACC.AccountId), 8), '-',MID(HEX(ACC.AccountId), 9, 4), 
    '-',MID(HEX(ACC.AccountId), 13, 4), '-',MID(HEX(ACC.AccountId), 17, 4), '-',
    RIGHT(HEX(ACC.AccountId), 12))) AS accountId,LOWER(CONCAT(LEFT(HEX(ACC.AppSecretId), 8), '-',MID(HEX(ACC.AppSecretId), 9, 4), 
    '-',MID(HEX(ACC.AppSecretId), 13, 4), '-',MID(HEX(ACC.AppSecretId), 17, 4), '-',
    RIGHT(HEX(ACC.AppSecretId), 12))) AS appSecretToken
    FROM Accounts AS ACC
        WHERE ${whereCondition};`;
    return query;
  }

  public getDestination(accountId?) {
    let query = `SELECT DISTINCT DEST.Id AS destinationId,DEST.Url AS url,
    DEST.Method AS method,DEST.Headers AS headers FROM Destinations AS DEST 
    WHERE LOWER(CONCAT(LEFT(HEX(FK_AccountId), 8), '-',MID(HEX(FK_AccountId), 9, 4), 
    '-',MID(HEX(FK_AccountId), 13, 4), '-',MID(HEX(FK_AccountId), 17, 4), '-',
    RIGHT(HEX(FK_AccountId), 12))) = '${accountId}'
    ;`;
    return query;
  }

  public fetchVesselImoAndNameTable() {
    let query = `SELECT * FROM ImoAndVesselName`;
    return query;
  }

  public fetchUserRegister(adUserUid) {
    let query = `SELECT LOWER(CONCAT(LEFT(HEX(UserUid), 8), '-',MID(HEX(UserUid), 9, 4), 
    '-',MID(HEX(UserUid), 13, 4), '-',MID(HEX(UserUid), 17, 4), '-',
    RIGHT(HEX(UserUid), 12))) AS userUid FROM Users WHERE AdUserUid = UNHEX(REPLACE("${adUserUid}","-",""));`;
    return query;
  }

  public deleteAccount(id) {
    let query = `UPDATE Accounts SET IsActive = 0 WHERE AccountId = UNHEX("${id}")`;
    return query;
  }
}

export const queryHelper = new QueryHelper();

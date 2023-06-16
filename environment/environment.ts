export const environment = {
  MySQLConfig: {
    host: process.env.MY_SQL_URL || "localhost",
    user: process.env.MY_SQL_USER || "root",
    password: process.env.MY_SQL_PASSWORD || "",
    database: process.env.MY_SQL_DATABASE || "DataPusher",
    port: Number(process.env.MY_SQL_PORT) || 3306,
  },
  PORT: process.env.PORT || 9120,
};

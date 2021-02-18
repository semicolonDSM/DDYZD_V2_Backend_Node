import databaseConfigList from "./database-config";

type NodeEnvironment = "production" | "test" | "development";

const env: NodeEnvironment = process.env.NODE_ENV as NodeEnvironment;
const databaseConfig = databaseConfigList[env];

export const config = {
  NodeEnv: env,
  type: databaseConfig.type,
  dbHost: databaseConfig.host,
  dbPort: databaseConfig.port,
  dbUser: databaseConfig.username,
  dbPassword: databaseConfig.password,
  dbName: databaseConfig.database,
  dbSynchronize: databaseConfig.synchronize,
  dbLogging: databaseConfig.logging,
  jwtSecret: process.env.JWT_SECRET,
  ServicePort: process.env.PORT,
  dsmAuthClientId: process.env.DSM_AUTH_CLIENT_ID,
  dsmAuthClientSecret: process.env.DSM_AUTH_CLIENT_SECRET,
  dsmAuthUrl: "http://54.180.98.91:8080",
  dsmOpenApiUrl: "http://54.180.98.91:8090",
  githubAccessToken: process.env.GITHUB_ACCESS_TOKEN,
} 
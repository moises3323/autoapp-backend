const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const appDir = "/app";
const rootEnvYamlPath = path.join(appDir, "example.env.yaml");
const appEnvYamlPath = path.join(appDir, "env.yaml");

// Ensure /app directory exists
if (!fs.existsSync(appDir)) {
  fs.mkdirSync(appDir, { recursive: true });
}

// Read the root env.yaml as template
const template = yaml.load(fs.readFileSync(rootEnvYamlPath, "utf8"));

// Replace values with environment variables if available
function replaceWithEnv(obj) {
  //   if (typeof obj !== 'object' || obj === null) return obj;
  //   const result = Array.isArray(obj) ? [] : {};
  //   for (const key in obj) {
  //     if (typeof obj[key] === 'object' && obj[key] !== null) {
  //       result[key] = replaceWithEnv(obj[key]);
  //     } else {
  //       result[key] = process.env[key] !== undefined ? process.env[key] : obj[key];
  //     }
  //   }
  const result = {
    development: {
      PORT: 4000,
      DATABASE: {
        MYSQL: {
          HOST: process.env.HOST,
          TYPE: process.env.TYPE,
          PORT: process.env.PORT,
          DATABASE: process.env.DATABASE,
          USERNAME: process.env.USERNAME,
          PASSWORD: process.env.PASSWORD,
          TIMEOUT: 60000,
          DIALECT: "mysql",
          LOGGING: false,
          SYNCHRONIZE: true,
          SYNCHRONIZE_LOG: false,
          POOL_MAX: 10,
          POOL_MIN: 0,
          POOL_ACQUIRE: 30000,
          POOL_IDLE: 10000,
        },
      },
      SWAGGER: {
        HOST: "localhost",
        API_DOCS_PATH: "/api-docs",
        BASE_PATH: "/api",
      },
      PAGE_SIZE: 5,
      TOKEN: {
        ACCESS: {
          TIMEOUT: "30m",
        },
        REFRESH: {
          TIMEOUT: "30d",
        },
        KEYWORD_SECRET:
          "3gB3M}.Wpwi&A!5-6f|kr9/s.41G.]``o+!}1$i?Dpa$9XnGCC&[LWNJ+!q{r;J",
      },
      GCLOUD: {
        PROJECT_ID: "devbucket-380616",
        GCLOUD_APP_CREDENTIALS: "./service_account_gcp.json",
        BUCKET_NAME: "dev-bb",
        FILE_SIZE: 10,
        GCS_URL: "https://storage.googleapis.com",
      },
      CRYPTO: {
        SECRET_KEY: "mysecretkey12333343",
      },
      ADMIN_EMAIL: "no-reply@xd.io",
      ENABLE_STACK: true,
    },
  };
  return result;
}

const finalEnv = replaceWithEnv(template);

// Write the new env.yaml to /app (create if doesn't exist)
fs.writeFileSync(appEnvYamlPath, yaml.dump(finalEnv), "utf8");
console.log(`Generated ${appEnvYamlPath}`);

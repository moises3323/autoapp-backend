const http = require("http");
const yenv = require("yenv");
const { printLog } = require("../shared/helpers");

const env = yenv();

export const inicialize = (app) => {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app);
    server
      .listen(env.PORT)
      .on("listening", () => {
        printLog.info("Server running on port " + server.address().port)
        resolve(true);
      })
      .on("error", (error) => {
        printLog.error(error);
        reject(error);
      });
  });
};

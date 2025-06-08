const http = require("http");
const yenv = require("yenv");
const { printLog } = require("../shared/helpers");


const inicialize = (app) => {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app);
    const port = process.env.PORT || 4000;
    server
      .listen(port, '0.0.0.0')
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

module.exports = {
  inicialize,
};

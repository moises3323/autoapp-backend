const { v4: uuidv4 } = require("uuid");

const info = (text) => console.log("\x1b[32m", text);
const error = (text, traceId) => {
  console.log("\x1b[31m%s\x1b[0m", "traceId:", traceId || uuidv4());
  console.log(
    "\x1b[31m%s\x1b[0m",
    "Log:",
    typeof text === Object ? JSON.stringify(text, null, 2) : text
  );
};

module.exports = {
  info,
  error,
};

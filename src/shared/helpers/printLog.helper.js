import { v4 as uuidv4 } from "uuid";

export const info = (text) => console.log("\x1b[32m", text);
export const error = (text, traceId) => {
  console.log("\x1b[31m%s\x1b[0m", "traceId:", traceId || uuidv4());
  console.log(
    "\x1b[31m%s\x1b[0m",
    "Log:",
    typeof text === Object ? JSON.stringify(text, null, 2) : text
  );
};

import CryptoJS from "crypto-js";
import yenv from "yenv";

const env = yenv();
const SECRET_KEY = env.CRYPTO.SECRET_KEY;

// Define a function to encrypt a string
export const encrypt = (data) => {
  const str = convertToString(data);
  const encrypted = CryptoJS.AES.encrypt(str, SECRET_KEY);
  return encrypted.toString();
};

// Define a function to decrypt an encrypted string
export const decrypt = (data) => {
  const str = convertToString(data);
  const decrypted = CryptoJS.AES.decrypt(str, SECRET_KEY);
  return decrypted.toString(CryptoJS.enc.Utf8);
};

const convertToString = (param) => {
  if (typeof param === "object" && param !== null) {
    param = JSON.stringify(param);
  } else if (typeof param !== "string") {
    throw new Error("Parameter must be an object or a string");
  }
  return param.toString();
};

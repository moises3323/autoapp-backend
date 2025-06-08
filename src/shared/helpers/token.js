import jwt from "jsonwebtoken";
import { printLog } from ".";

export const generateToken = ({ payload = {}, secretKey, expiresIn }) => {
  const options = {
    expiresIn,
  };

  return jwt.sign(payload, secretKey, options);
};

export const validateAccessToken = ({ accessToken, secretKey }) => {
  return new Promise((resolve, reject) => {
    try {
      const payload = jwt.verify(accessToken, secretKey);
      resolve(payload);
    } catch (error) {
      if (error.message.toLowerCase() === "jwt expired") {
        reject({
          status: 409,
          message: "AccessToken expired",
        });
      } else {
        reject({
          status: 401,
          message: "Must login",
        });
      }
    }
  });
};

export const validateRefreshToken = ({ refreshToken, secretKey }) => {
  return new Promise((resolve, reject) => {
    try {
      const payload = jwt.verify(refreshToken, secretKey);
      resolve(payload);
    } catch (error) {
      if (error.message.toLowerCase() === "token expired") {
        reject({
          status: 400,
          message: "AccessToken expired",
        });
      } else {
        reject({
          status: 400,
          message: "Must login",
        });
      }
    }
  });
};
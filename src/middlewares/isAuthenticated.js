import jwt from "jsonwebtoken";
import response from "../utils/response/ResponseHandler";
import HttpStatus from "http-status";
import Logger from "../logger";
import config from "../config/app";

export default (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) {
      return response(
        res,
        "Access denied, no token provided",
        HttpStatus.UNAUTHORIZED
      );
    }
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    next();
  } catch (error) {
    Logger.error(error);
    return response(res, "Invalid token", HttpStatus.UNAUTHORIZED);
  }
};

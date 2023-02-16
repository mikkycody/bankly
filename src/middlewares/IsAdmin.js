import jwt from "jsonwebtoken";
import response from "../utils/response/ResponseHandler";
import HttpStatus from "http-status";
import Logger from "../logger";
import config from "../config/app";
import User from "../models/user";
import { RoleEnum } from "../types";

export default async (req, res, next) => {
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
    const admin = await User.findById(decoded.id);
    if (admin.role !== RoleEnum.ADMIN) {
      return response(res, "Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    req.user = decoded;
    next();
  } catch (error) {
    Logger.error(error);
    return response(res, "Invalid token", HttpStatus.UNAUTHORIZED);
  }
};

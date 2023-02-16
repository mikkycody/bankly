import { Types } from "mongoose";
import AppError from "../exceptions";

const parseToObjectId = (id) => {
  const isValid = Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new AppError("Invalid objectId");
  }
  return new Types.ObjectId(id);
};

const convertToSmallestUnit = (amount) => {
  const smallestUnit = 100;
  return amount * smallestUnit;
};

const generateWalletReference = (prefix = "TXN_") => {
  return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
};
export default { parseToObjectId, convertToSmallestUnit, generateWalletReference };

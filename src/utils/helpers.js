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

const paginate = async (model, query, pageParam = 1, limit = 10) => {
  const page = parseInt(pageParam);
  // Calculate the number of results to skip based on the page and limit
  const skip = (page - 1) * limit;

  // Execute the query to get the total count
  const count = await model.countDocuments(query);

  // Calculate the total number of pages
  const totalPages = Math.ceil(count / limit);

  // Execute the query to get the results for the current page
  const results = await model.find(query).skip(skip).limit(limit);

  // Calculate pagination values
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  const nextPage = hasNextPage ? page + 1 : null;
  const prevPage = hasPrevPage ? page - 1 : null;

  // Return the pagination object
  return {
    totalPages,
    currentPage: page,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    results,
  };
};

export default {
  parseToObjectId,
  convertToSmallestUnit,
  generateWalletReference,
  paginate,
};

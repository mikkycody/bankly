import mongoose from "mongoose";
import Logger from "../logger";
import config from "../config/app";

const db = config.database.url;

mongoose.set("strictQuery", false);

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  Logger.info("MongoDB database connection established successfully");
});

mongoose.connection.on("error", (err) => {
  Logger.error(`MongoDB connection error: ${err}`);
});

export default mongoose;

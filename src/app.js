import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index";
import logger from "./logger";
import ErrorHandler from "./exceptions/handler";
import config from "./config/app";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  handler: ({res}) => {
    res
      .status(429)
      .json({
        status: false,
        message: "Too many requests, please try again later.",
      });
  },
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(limiter);
app.use("/api/v1", routes);
app.use(ErrorHandler);

const port = config.app.port || 4040;

app.listen(port, () => {
  logger.info(`server running on port ${port}`);
});

export default app;

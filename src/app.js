import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index";
import logger from "./logger";
import ErrorHandler from "./exceptions/handler";
import config from "./config/app";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/v1", routes);
app.use(ErrorHandler);

const port = config.app.port || 4040;

app.listen(port, () => {
  logger.info(`server running on port ${port}`);
});

export default app;

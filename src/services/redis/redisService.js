import { createClient } from "redis";
import Logger from "../../logger";

const client = createClient();
client.on("error", (err) =>
  Logger.error("Could not establish a connection with redis", err)
);
client.on("connect", () => Logger.info("Connected to redis successfully"));
new Promise((resolve, reject) => {
  client.connect();
  resolve();
});
export default client;

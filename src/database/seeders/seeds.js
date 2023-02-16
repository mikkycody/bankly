import Logger from "../../logger";
import User from "../../models/user";
import { RoleEnum } from "../../types";

const seedAdmin = async () => {
  await User.findOneAndUpdate(
    { email: "admin@bankly.io" },
    {
      firstname: "super",
      lastname: "admin",
      email: "admin@bankly.io",
      password:
        "$argon2id$v=19$m=65536,t=3,p=4$p8nOphTLYgdxZvjjxAnmWA$CQwaoC9VOqmuvqxM5dKeXoZFwakJ7MOikGVOfzaIsmQ", // #StrongPwd01
      role: RoleEnum.ADMIN,
    },
    { upsert: true }
  );
  Logger.info("Admin data seeded");
};

seedAdmin();

import mongoose from "../database";
import { RoleEnum } from "../types";
const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      default: RoleEnum.USER,
      enum: Object.values(RoleEnum),
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;

import { Types } from "mongoose";
import mongoose from "../database";
import { TransactionTypeEnum } from "../types";

const WalletSchema = new mongoose.Schema(
  {
    user: { type: Types.ObjectId, required: true, ref: "User" },
    reference: { type: String, required: true },
    transactionType: {
      type: String,
      required: true,
      enum: Object.values(TransactionTypeEnum),
    },
    currency: { type: String, default: "NGN" },
    amount: { type: Number, required: true },
    oldBalance: { type: Number, required: true },
    newBalance: { type: Number, required: true },
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", WalletSchema);

export default Wallet;

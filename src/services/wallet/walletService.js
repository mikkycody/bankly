import HttpStatus from "http-status";
import AppError from "../../exceptions";
import Wallet from "../../models/wallet";
import User from "../../models/user";
import { TransactionTypeEnum } from "../../types";
import helpers from "../../utils/helpers";
import mongoose from "../../database";

const deposit = async (amount, userId) => {
  const getCurrentBalance = await getUserBalance(userId);
  const newBalance = getCurrentBalance + helpers.convertToSmallestUnit(amount);
  const deposit = await Wallet.create({
    user: helpers.parseToObjectId(userId),
    reference: helpers.generateWalletReference("DEP_"),
    transactionType: TransactionTypeEnum.CREDIT,
    amount: helpers.convertToSmallestUnit(amount),
    oldBalance: getCurrentBalance,
    newBalance,
  });
  return deposit;
};

const transfer = async (payload, userId) => {
  const receiver = await User.findOne({ email: payload.email });
  const getCurrentBalanceOfSender = await getUserBalance(userId);
  const amount = helpers.convertToSmallestUnit(payload.amount);
  const getCurrentBalanceOfReceiver = await getUserBalance(receiver._id);
  if (amount > getCurrentBalanceOfSender) {
    throw new AppError("Insufficient funds", HttpStatus.BAD_REQUEST);
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const senderNewBalance = getCurrentBalanceOfSender - amount;
    const receiverNewBalance = getCurrentBalanceOfReceiver + amount;
    await Wallet.create({
      user: helpers.parseToObjectId(userId),
      reference: helpers.generateWalletReference("TRF_"),
      transactionType: TransactionTypeEnum.DEBIT,
      amount,
      oldBalance: getCurrentBalanceOfSender,
      newBalance: senderNewBalance,
    });

    await Wallet.create({
      user: helpers.parseToObjectId(receiver._id),
      reference: helpers.generateWalletReference("TRF_"),
      transactionType: TransactionTypeEnum.CREDIT,
      amount,
      oldBalance: getCurrentBalanceOfReceiver,
      newBalance: receiverNewBalance,
    });

    session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

const getUserBalance = async (userId) => {
  const mostRecentRecord = await Wallet.findOne(
    { user: helpers.parseToObjectId(userId) },
    {},
    { sort: { createdAt: -1 } }
  );
  return mostRecentRecord?.newBalance ?? 0;
};

export default { deposit, transfer };

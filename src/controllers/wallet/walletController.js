import HttpStatus from "http-status";
import response from "../../utils/response/ResponseHandler";
import validateDeposit from "../../validators/wallet/depositValidator";
import validateTransfer from "../../validators/wallet/transferValidator";
import walletService from "../../services/wallet/walletService";

const deposit = async (req, res, next) => {
  try {
    const { error, value: payload } = await validateDeposit(req.body);
    if (error) {
      return response(res, error.message, HttpStatus.BAD_REQUEST);
    }
    const deposit = await walletService.deposit(payload.amount, req.user.id);
    return response(res, "Deposit Successful", HttpStatus.OK, deposit);
  } catch (error) {
    next(error);
  }
};

const transfer = async (req, res, next) => {
  try {
    const { error, value: payload } = await validateTransfer(req.body);
    if (error) {
      return response(res, error.message, HttpStatus.BAD_REQUEST);
    }
    await walletService.transfer(payload, req.user.id);
    return response(res, "Transfer Successful", HttpStatus.OK);
  } catch (error) {
    next(error);
  }
};

export { deposit, transfer };

import express from "express";
import { deposit, transfer } from "../../controllers/wallet/walletController";
import isAuthenticated from "../../middlewares/isAuthenticated";

const router = express.Router();

router.post("/deposit", isAuthenticated, deposit);
router.post("/transfer", isAuthenticated, transfer);

export default router;

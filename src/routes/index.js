import express from "express";
import adminRoutes from "./admin";
import authRoutes from "./auth";
import walletRoutes from "./wallet";

const router = express.Router();

router.get("/", ({ res }) => {
  res.status(200).json({
    status: true,
    message: "Welcome to Bankly Api v1.0.0",
  });
});

router.use("/admin/", adminRoutes);
router.use("/auth/", authRoutes);
router.use("/wallet/", walletRoutes);

export default router;

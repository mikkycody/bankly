import express from "express";
import authRoutes from "./auth";

const router = express.Router();

router.get("/", ({ res }) => {
  res.status(200).json({
    status: true,
    message: "Welcome to Bankly Api v1.0.0",
  });
});

router.use("/auth/", authRoutes);

export default router;

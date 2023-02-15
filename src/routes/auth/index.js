import express from "express";
import {
  signup,
  signin,
  refreshToken,
} from "../../controllers/auth/authController";

const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/refresh", refreshToken);

export default router;

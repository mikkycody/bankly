import express from "express";
import { getUsers } from "../../controllers/admin/adminController";
import IsAdmin from "../../middlewares/IsAdmin";

const router = express.Router();
router.get("/all-users", IsAdmin, getUsers);

export default router;

import express from "express";
import { test_api, test_get_api, register, login } from "../controller";
const router = express.Router();

router.use("/api/test", test_api);
router.use("/api/get/tests", test_get_api);

// new
router.post("/api/register", register)
router.post("/api/login", login)

export default router;

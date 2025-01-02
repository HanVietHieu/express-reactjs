import express from "express";
import { test_api, test_get_api, register } from "../controller";
const router = express.Router();

router.use("/api/test", test_api);
router.use("/api/get/tests", test_get_api);

// new
router.use("/api/register", register)

export default router;

import express from "express";
import { test_api, test_get_api } from "../controller";
const router = express.Router();

router.use("/api/test", test_api);
router.use("/api/get/tests", test_get_api);

export default router;

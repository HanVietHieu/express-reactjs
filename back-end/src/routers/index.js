import express from "express";
import { test_api } from "../controller";
const router = express.Router();

router.use("/api/test", test_api());

export default router;

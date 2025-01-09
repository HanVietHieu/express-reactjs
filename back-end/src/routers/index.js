import express from "express";
import { test_api, test_get_api, register, login, editProfile, uploadAvt} from "../controller";
import { verifyAuthorization } from "../helper";
import { changePassWord } from "../controller";
const router = express.Router();

router.use("/api/test", test_api);
router.use("/api/get/tests", test_get_api);

// new
router.post("/api/register", register)
router.post("/api/login", login)
router.post("/api/update-profile", verifyAuthorization, editProfile)
router.post("/api/upload",verifyAuthorization, uploadAvt)
router.post("/api/change-pass-word", verifyAuthorization, changePassWord)

export default router;

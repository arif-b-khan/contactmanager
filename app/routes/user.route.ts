import express from "express";
import * as userController from "../controllers/user";
import * as passportConfig from "../config/passport";
import passport from "passport";
const router = express.Router();

router.get("/",passport.authenticate('jwt', {session:false}), passportConfig.isAuthenticated, userController.getUser);

router.post("/logout",passport.authenticate('jwt', {session:false}), passportConfig.isAuthenticated, userController.logout);
router.route("/login").post(userController.postLogin);
router.route("/forgot").post(userController.forgotPassword);
router.route("/reset/:token").post(userController.resetPassword);
router.route("/signup").post(userController.signUp);

export default router;
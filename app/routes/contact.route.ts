import express from "express";
import * as contact from "../controllers/contact";
import passport from "passport";

const router = express.Router();

router.get("/", passport.authenticate('jwt', {session:false}), contact.getContact);

export default router;
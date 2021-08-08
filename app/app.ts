import express from "express";
import serveIndex from "serve-index";
import compression from "compression";  // compresses requests
import session from "express-session";
import fs from "fs";
import bodyParser from "body-parser";
import lusca from "lusca";
import mongo from "connect-mongo";
import logger from "morgan";
import path from "path";
import mongoose from "mongoose";
import passport from "passport";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

const MongoStore = mongo(session);

// Controllers (route handlers)
import userRoute from "./routes/user.route";
import accountRoute from "./routes/account.route";
import contactRoute from "./routes/contact.route";

import * as homeController from "./controllers/home";
import * as apiController from "./controllers/api";


// API keys and Passport configuration
import * as passportConfig from "./config/passport";

// Create Express server
const app = express();

// setup the logger 

app.use(logger('dev'));
// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(process.cwd(), 'build', 'client')));
// app.set("views", path.join(__dirname, "../views"));
// app.set("view engine", "pug");

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
// app.use(passport.session());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));


/**
 * Primary app routes.
 */
app.get("/api", homeController.index);
app.use("/api/user", userRoute);
app.use("/api/contacts", passport.authenticate('jwt', {session: false})
, contactRoute);
app.use("/api/account", accountRoute);

/**
 * API examples routes.
 */
// app.get("/api/facebook", passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);

/**
 * OAuth authentication routes. (Sign in)
 */
// app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
// app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "user/login" }), (req, res) => {
//     res.redirect(req.session.returnTo || "/");
// });

export default app;

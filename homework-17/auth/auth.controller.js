const {Router} = require("express");
const authRouter = Router();

const {loginValidation} = require("../middlewares/validate.middleware.js");
const {registerValidation} = require("../middlewares/validate.middleware.js");
const isAuth = require("../middlewares/isAuth.middleware.js")

const authService = require("./auth.service.js");

authRouter.post("/login",       loginValidation,         authService.login);

authRouter.post("/register",    registerValidation,      authService.register);

authRouter.get("/profile",      isAuth,                  authService.profile);

authRouter.delete("/profile",   isAuth,                  authService.deleteProfile);



module.exports = authRouter;
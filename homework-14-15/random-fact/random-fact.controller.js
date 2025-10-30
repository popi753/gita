const {Router} = require("express");
const randomFactRouter = Router();

const randomFactMiddleware = require("../middlewares/random-fact.middleware.js");

const randomFactService = require("./random-fact.service.js");

randomFactRouter.get("/", randomFactMiddleware, randomFactService.randomFact);


module.exports = randomFactRouter;

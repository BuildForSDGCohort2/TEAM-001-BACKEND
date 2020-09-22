const express = require("express");
const Agents = require("./../model/agent.model");
const { secret } = require("../../config/env");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { regForm, loginForm } = require("../middlewares/form")(body);
const {
  login,
  profile,
  register,
  agents,
  logout,
  del,
  update,
  upload,
} = require("../controller/agent.Controller")(
  Agents,
  bcrypt,
  secret,
  jwt,
  validationResult
);

const { Router } = express;

const agentRouter = Router();

agentRouter.route("/").get(agents);
agentRouter.route("/login").post(loginForm, login);
agentRouter.route("/register").post(register);
agentRouter.route("/logout").post(logout);
agentRouter.route("/upload").post(upload);
agentRouter.route("/profile/:id").get(profile);
agentRouter.route("/edit/:id").patch(update);
agentRouter.route("/delete/:id").delete(del);

module.exports = agentRouter;

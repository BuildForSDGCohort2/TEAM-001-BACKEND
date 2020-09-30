const express = require("express");
const Agents = require("./../model/agent.model");
const auth = require('./../middlewares/auth')
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
agentRouter.route("/register").post(regForm, register);
agentRouter.route("/logout").post(auth, logout);
agentRouter.route("/upload").post(auth, upload);
agentRouter.route("/profile/:id").get(auth, profile);
agentRouter.route("/profile/edit/:id").patch(auth, update);
agentRouter.route("/profile/delete/:id").delete(auth, del);

module.exports = agentRouter;

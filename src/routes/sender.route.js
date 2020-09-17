const express = require("express");
const Senders = require("./../model/sender.model");
const { secret } = require("./../../config/env");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { regForm, loginForm } = require("./../middlewares/form")(body);
const {
  register,
  login,
  logout,
  profile,
  senders,
  del,
  update
} = require("./../controller/sender.Controller")(
  Senders,
  bcrypt,
  secret,
  jwt,
  validationResult
);

const { Router } = express;

const senderRouter = Router();

senderRouter.route("/register").post(register);
senderRouter.route("/login").post(loginForm, login);
senderRouter.route("/logout").post(logout);
senderRouter.route("/").get(senders);
senderRouter.route("/profile/:id").get(profile);
senderRouter.route("/edit/:id").patch(update);
senderRouter.route("/delete/:id").delete(del);

module.exports = senderRouter;

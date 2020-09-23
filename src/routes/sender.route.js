const express = require("express");
const Senders = require("./../model/sender.model");
const auth = require('./../middlewares/auth')
const { secret } = require("./../../config/env");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const { regForm, loginForm } = require("./../middlewares/form")(check);
check().normalizeEmail
const {
  register,
  login,
  logout,
  profile,
  senders,
  del,
  update,
  upload,
} = require("./../controller/sender.Controller")(
  Senders,
  bcrypt,
  secret,
  jwt,
  validationResult
);

const { Router } = express;

const senderRouter = Router();

senderRouter.route("/register").post(regForm, register);
senderRouter.route("/login").post(loginForm, login);
senderRouter.route("/logout").post(auth, logout);
senderRouter.route("/profile/upload").post(auth, upload);
senderRouter.route("/").get(senders);
senderRouter.route("/profile/:id").get(auth, profile);
senderRouter.route("/profile/edit/:id").patch(auth,update);
senderRouter.route("profile/delete/:id").delete(auth,del);

module.exports = senderRouter;

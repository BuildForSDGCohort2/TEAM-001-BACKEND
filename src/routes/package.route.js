const express = require("express");
const Packages = require("./../model/package.model");
const { check } = require("express-validator");
const { newPackage, findPackage } = require("../middlewares/form")(check);
const { packages, addPackage } = require("../controller/package.Controller")( Packages);

const { Router } = express;

const packageRouter = Router();

packageRouter.route("/").get(packages);
packageRouter.route("/new").post(addPackage);

module.exports = packageRouter;

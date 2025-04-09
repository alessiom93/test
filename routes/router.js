"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller = require("../controllers/controller");
const express = require("express");
const router = express.Router();
router.get("/test1", controller.test1);
exports.default = router;

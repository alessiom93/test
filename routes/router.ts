const controller = require("../controllers/controller");
const express = require("express");

const router = express.Router();

router.get("/test1", controller.test1);

export default router;

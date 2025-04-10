const controller = require("../controllers/controller");
const express = require("express");

const router = express.Router();

router.post("/test1", controller.test1);

export default router;

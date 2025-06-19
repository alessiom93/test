const controller = require("../controllers/controller");
const express = require("express");

const router = express.Router();

router.post("/test1", controller.test1);
router.post("/test2", controller.test2);

export default router;

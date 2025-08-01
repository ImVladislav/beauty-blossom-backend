const express = require("express");
const ctrl = require("../../controllers/conversion");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/conversion");

const router = express.Router();

router.post("/", authenticate, validateBody(schemas.sendSchema), ctrl.send);

module.exports = router;

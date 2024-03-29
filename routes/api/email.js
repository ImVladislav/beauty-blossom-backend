const express = require("express");
const ctrl = require("../../controllers/nodemailer");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/email");
// const { schemas } = require("../../models/goods");
const router = express.Router();

// Маршрут для відправки електронної пошти
router.post("/", validateBody(schemas.addSchema), ctrl.email);

module.exports = router;

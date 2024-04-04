const express = require("express");

const ctrl = require("../../controllers/users");

const router = express.Router();

router.post("/", ctrl.getUsers);

module.exports = router;

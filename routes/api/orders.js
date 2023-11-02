const express = require("express");

const ctrl = require("../../controllers/orders");

const {validateBody, isValidId, authenticate} = require("../../middlewares");

const {schemas} = require("../../models/orders");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.put("/:id", isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch("/:id/checked", authenticate, isValidId, validateBody(schemas.updateChekedSchema), ctrl.updateCheked);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

module.exports = router;

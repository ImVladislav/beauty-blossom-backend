const express = require("express");

const ctrl = require("../../controllers/wood");

const {validateBody, isValidId, authenticate} = require("../../middlewares");

const {schemas} = require("../../models/wood");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.put("/:id", authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch("/:id/checked", authenticate, isValidId, validateBody(schemas.updateChekedSchema), ctrl.updateCheked);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

module.exports = router;



// router.get('/', async (request, responce) => {
//     // console.log(request.url);
//     // console.log(request.method);

// //   responce.send(woodModule)
//     // responce.json(woodModule)//json обробляє null тому краще писати так 
//     const result = await wood.getAll();
//     responce.json(result)
// })
// // 1 назва маршруту
// // 2 функцыя яка виконується коли маршрут знайдено







// router.get('/', async (request, responce) => {
//     // console.log(request.url);
//     // console.log(request.method);

// //   responce.send(woodModule)
//     // responce.json(woodModule)//json обробляє null тому краще писати так 
//     const result = await wood.getAll();
//     responce.json(result)
// })
// // 1 назва маршруту
// // 2 функцыя яка виконується коли маршрут знайдено




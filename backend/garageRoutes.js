const express = require("express");
const router = express.Router();
const controller = require("./garageController");

// GARAGENS
router.get("/garagens", controller.listGarages);
router.post("/garagens", controller.addGarage);
router.put("/garagens/:id/disponivel", controller.setAvailable);
router.put("/garagens/:id/reservar", controller.reserve);
router.put("/garagens/:id/liberar", controller.release);

// PEDIDOS (comentários do morador)
router.post("/pedidos", controller.createRequest);
router.get("/pedidos", controller.listRequests);

module.exports = router;

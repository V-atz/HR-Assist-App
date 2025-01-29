const express = require("express");
const router = express.Router();
const { handleCreateSlot, handleGetSlots } = require("../controllers/slotControllers");

router.post("/slots", handleCreateSlot);
router.get("/slots", handleGetSlots);
router.delete("/:id");

module.exports = router;
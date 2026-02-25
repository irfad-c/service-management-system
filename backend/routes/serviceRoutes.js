import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createService,
  getServices,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createService);
router.get("/", getServices);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;


import express from "express";
import { getAllDuplicates, patchDuplicate } from "../controllers/duplicate.controller.js";

const router = express.Router();

router.get("/", getAllDuplicates);
router.patch("/:id", patchDuplicate);

export default router;

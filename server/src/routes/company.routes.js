import express from "express";
import { getAllCompanies } from "../controllers/company.controller.js";

const router = express.Router();

router.get("/", getAllCompanies);

export default router;

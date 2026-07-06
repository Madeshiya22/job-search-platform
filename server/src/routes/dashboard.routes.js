import express from "express";
import dashboardStats from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", dashboardStats);

export default router;

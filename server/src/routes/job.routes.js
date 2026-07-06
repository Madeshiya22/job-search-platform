import express from "express";
import { getAllJobs, getSingleJob, fetchCompanies, fetchLocations, fetchDuplicateJobs, markDuplicate } from "../controllers/job.controller.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/companies", fetchCompanies);
router.get("/locations", fetchLocations);
router.get("/duplicates", fetchDuplicateJobs);
router.patch("/duplicates/:id", markDuplicate);
router.get("/:id", getSingleJob);

export default router;

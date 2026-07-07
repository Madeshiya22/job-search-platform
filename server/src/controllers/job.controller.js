import { getJobs, getJobById, getCompanies, getLocations, getDuplicateJobs, updateDuplicateStatus } from "../services/job.service.js";
import mongoose from "mongoose";
import { getJobsSchema } from "../validators/job.validator.js";

export const getAllJobs = async (req, res) => {
  try {
    const validatedQuery = getJobsSchema.parse(req.query);
    const data = await getJobs(validatedQuery);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};

export const getSingleJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Job ID",
      });
    }

    const job = await getJobById(id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch job" });
  }
};

export const fetchCompanies = async (req, res) => {
  try {
    const companies = await getCompanies();

    res.status(200).json({
      success: true,
      data: companies,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch companies",
    });
  }
};

export const fetchLocations = async (req, res) => {
  try {
    const locations = await getLocations();

    res.status(200).json({
      success: true,
      data: locations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch locations",
    });
  }
};

export const fetchDuplicateJobs = async (req, res) => {
  try {
    const jobs = await getDuplicateJobs();

    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch duplicate jobs",
    });
  }
};

export const markDuplicate = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Job ID",
      });
    }

    const { duplicateStatus } = req.body;

    const updatedJob = await updateDuplicateStatus(id, duplicateStatus);

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedJob,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update duplicate status",
    });
  }
};

import { getDuplicates, updateDuplicateStatus } from "../services/duplicate.service.js";
import mongoose from "mongoose";

export const getAllDuplicates = async (req, res) => {
  try {
    const data = await getDuplicates(req.query);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch duplicates" });
  }
};

export const patchDuplicate = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Job ID",
      });
    }

    const updatedJob = await updateDuplicateStatus(id, req.body);
    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, data: updatedJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update duplicate status" });
  }
};

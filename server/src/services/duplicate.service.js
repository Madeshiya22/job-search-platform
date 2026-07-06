import Job from "../models/job.model.js";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "../constants/job.constants.js";

export const getDuplicates = async (query) => {
  const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, type } = query;
  
  const filter = { isDuplicate: true };
  if (type) {
    filter.duplicateType = type;
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [duplicates, total] = await Promise.all([
    Job.find(filter)
      .populate("duplicateOf")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Job.countDocuments(filter),
  ]);

  return {
    duplicates,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateDuplicateStatus = async (id, payload) => {
  return await Job.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  ).populate("duplicateOf");
};

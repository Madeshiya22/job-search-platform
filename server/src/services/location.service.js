import Job from "../models/job.model.js";

export const getLocations = async (search) => {
  const filter = {};
  if (search) {
    filter.location = { $regex: search, $options: "i" };
  }
  return await Job.distinct("location", filter);
};

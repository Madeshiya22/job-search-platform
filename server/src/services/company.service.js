import Job from "../models/job.model.js";

export const getCompanies = async (search) => {
  const filter = {};
  if (search) {
    filter.company = { $regex: search, $options: "i" };
  }
  return await Job.distinct("company", filter);
};

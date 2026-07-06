import Job from "../models/job.model.js";

const getDashboardStats = async () => {
  const [
    totalJobs,
    totalCompanies,
    totalLocations,
    remoteJobs,
    duplicateJobs,
    fullTimeJobs,
  ] = await Promise.all([
    Job.countDocuments(),

    Job.distinct("company").then((companies) => companies.length),

    Job.distinct("location").then((locations) => locations.length),

    Job.countDocuments({
      workMode: "Remote",
    }),

    Job.countDocuments({
      isDuplicate: true,
    }),

    Job.countDocuments({
      employmentType: { $in: ["Full Time", "Full-time"] },
    }),
  ]);

  return {
    totalJobs,
    totalCompanies,
    totalLocations,
    remoteJobs,
    duplicateJobs,
    fullTimeJobs,
  };
};

export default getDashboardStats;

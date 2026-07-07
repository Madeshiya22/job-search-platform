import Job from "../models/job.model.js";

const getDashboardStats = async () => {
  const [
    totalJobs,
    totalCompanies,
    totalLocations,
    remoteJobs,
    duplicateJobs,
    fullTimeJobs,
    jobsByCompany,
    jobsByWorkMode,
    jobsByEmploymentType,
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

    Job.aggregate([
      { $match: { company: { $nin: ["", null] } } },
      { $group: { _id: "$company", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]),

    Job.aggregate([
      { $match: { workMode: { $nin: ["", null] } } },
      { $group: { _id: "$workMode", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]),

    Job.aggregate([
      { $match: { employmentType: { $nin: ["", null] } } },
      { $group: { _id: "$employmentType", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
  ]);

  return {
    cards: {
      totalJobs,
      totalCompanies,
      totalLocations,
      remoteJobs,
      duplicateJobs,
      fullTimeJobs,
    },
    charts: {
      jobsByCompany,
      jobsByWorkMode,
      jobsByEmploymentType,
    },
  };
};

export default getDashboardStats;

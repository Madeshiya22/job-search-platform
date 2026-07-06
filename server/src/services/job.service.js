import Job from "../models/job.model.js";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "../constants/job.constants.js";

export const getJobs = async (query) => {
  const {
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
    search,
    company,
    location,
    experienceLevel,
    employmentType,
    workMode,
    sortBy = "createdAt",
    order = "desc",
  } = query;

  const filter = {};

  // Search
  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        company: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // Filters
  if (company) filter.company = company;

  if (location) filter.location = location;

  if (experienceLevel)
    filter.experienceLevel = experienceLevel;

  if (employmentType)
    filter.employmentType = employmentType;

  if (workMode)
    filter.workMode = workMode;

  const skip = (Number(page) - 1) * Number(limit);

  const [jobs, totalJobs] = await Promise.all([
    Job.find(filter)
      .sort({
        [sortBy]: order === "asc" ? 1 : -1,
      })
      .skip(skip)
      .limit(Number(limit)),

    Job.countDocuments(filter),
  ]);

  return {
    jobs,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
    },
  };
};

export const getJobById = async (id) => {
  return await Job.findById(id).populate("duplicateOf");
};

export const getCompanies = async () => {
  const companies = await Job.find({
    company: {
      $nin: ["", null],
    },
  }).distinct("company");

  return companies.sort((a, b) => a.localeCompare(b));
};

export const getLocations = async () => {
  const locations = await Job.find({
    location: {
      $nin: ["", null],
    },
  }).distinct("location");

  return locations.sort((a, b) => a.localeCompare(b));
};

export const getDuplicateJobs = async () => {
  return await Job.find({
    isDuplicate: true,
  }).sort({
    company: 1,
    title: 1,
  });
};

export const updateDuplicateStatus = async (
  id,
  duplicateStatus
) => {
  return await Job.findByIdAndUpdate(
    id,
    {
      duplicateStatus,
    },
    {
      new: true,
    }
  );
};

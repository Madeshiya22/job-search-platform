import extractSalary from "./extractSalary.js";
import { WORK_MODES, EMPLOYMENT_TYPES, APPLY_TYPES } from "../constants/job.constants.js";

const normalizeJob = (job) => {
  return {
    title: job.title?.trim() || "Untitled",

    company: job.company?.trim() || "Unknown",

    location: job.location?.trim() || "Not Specified",

    url: job.url?.trim() || "",

    description: job.description || "",

    applyType: job.applyType || APPLY_TYPES.UNKNOWN,

    experienceLevel: job.experience_level || "Unknown",

    employmentType: job.employment_type || EMPLOYMENT_TYPES.UNKNOWN,

    department: job.department || "General",

    workMode: job.remote_flag || WORK_MODES.UNKNOWN,

    salary: extractSalary(
      job.description,
      job.currency
    ),

    postedDate: (job.datePosted && !isNaN(new Date(job.datePosted).getTime()))
      ? new Date(job.datePosted)
      : null,

    normalizedTitle:
      job.title?.trim().toLowerCase() || "",

    normalizedCompany:
      job.company?.trim().toLowerCase() || "",

    skills: [],

    isDuplicate: false,
  };
};

export default normalizeJob;

import extractSalary from "./extractSalary.js";

const normalizeJob = (job) => {
  return {
    title: job.title?.trim() || "Untitled",

    company: job.company?.trim() || "Unknown",

    location: job.location?.trim() || "Not Specified",

    url: job.url?.trim() || "",

    description: job.description || "",

    applyType: job.applyType || "Unknown",

    experienceLevel: job.experience_level || "Unknown",

    employmentType: job.employment_type || "Unknown",

    department: job.department || "General",

    workMode: job.remote_flag || "Unknown",

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

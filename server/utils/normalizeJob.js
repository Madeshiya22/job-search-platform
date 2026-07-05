import { extractSalary } from "./extractSalary.js";

const KNOWN_SKILLS = [
  "React", "Node.js", "MongoDB", "SQL", "Python", "Java", "AWS", "Azure",
  "Tableau", "Power BI", "Data Analysis", "Machine Learning", "JavaScript",
  "TypeScript", "Docker", "Kubernetes", "GraphQL", "REST", "C++", "C#",
  "Express", "Next.js", "Redux", "Tailwind CSS", "Git"
];

export const normalizeJob = (rawJob) => {
  // Extract salary from description if raw fields are missing
  const salary = extractSalary(rawJob.description || "", rawJob.currency);

  // Extract skills from description
  const skills = [];
  const descLower = (rawJob.description || "").toLowerCase();
  KNOWN_SKILLS.forEach(skill => {
    if (descLower.includes(skill.toLowerCase())) {
      skills.push(skill);
    }
  });

  // Parse work mode
  let workMode = "Unknown";
  if (rawJob.remote_flag === "Remote") workMode = "Remote";
  else if (rawJob.remote_flag === "Hybrid") workMode = "Hybrid";
  else if (rawJob.remote_flag === "On-site") workMode = "On-site";
  else {
    if (descLower.includes("remote")) workMode = "Remote";
    else if (descLower.includes("hybrid")) workMode = "Hybrid";
  }

  // Map fields to our Mongoose schema
  return {
    title: rawJob.title || "Unknown Title",
    company: rawJob.company || "Unknown Company",
    location: rawJob.location || "Not Specified",
    url: rawJob.url || "",
    description: rawJob.description || "",
    skills,
    applyType: rawJob.applyType || "Unknown",
    experienceLevel: rawJob.experience_level || "Unknown",
    employmentType: "Full-time", // Default assumption, could be expanded
    department: "General",
    workMode,
    salary,
    postedDate: rawJob.datePosted ? new Date(rawJob.datePosted) : null,
    
    // Normalized fields for searching
    normalizedTitle: (rawJob.title || "").toLowerCase().trim(),
    normalizedCompany: (rawJob.company || "").toLowerCase().trim()
  };
};

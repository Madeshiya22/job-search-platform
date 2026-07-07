import { z } from "zod";

export const getJobsSchema = z.object({
  page: z.coerce.number().int().min(1, "Page must be at least 1").optional().default(1),
  limit: z.coerce.number().int().min(1, "Limit must be at least 1").max(100, "Limit cannot exceed 100").optional().default(10),
  search: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  experienceLevel: z.string().optional(),
  employmentType: z.string().optional(),
  workMode: z.string().optional(),
  sortBy: z.enum([
    "title",
    "company",
    "location",
    "workMode",
    "employmentType",
    "postedDate",
    "createdAt"
  ]).optional().default("postedDate"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
});

import path from "path";
import { fileURLToPath } from "url";
import xlsx from "xlsx";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import normalizeJob from "../utils/normalizeJob.js";
import Job from "../models/job.model.js";
import detectDuplicates from "../utils/detectDuplicates.js";

dotenv.config();

await connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(
  __dirname,
  "../../dataset/Jobs Dataset.xlsx"
);

console.log("Loading Excel file (This may take a minute for large files)...");
const workbook = xlsx.readFile(filePath);

const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

console.log("Converting to JSON...");
const rawJobs = xlsx.utils.sheet_to_json(worksheet);

console.log(`Found ${rawJobs.length} raw jobs. Normalizing data...`);

const normalizedJobs = rawJobs.map(normalizeJob);

// Phase 1: Clean and Insert
console.log("\n--- Phase 1: Import ---");
await Job.deleteMany();
console.log("Old jobs deleted");

await Job.insertMany(normalizedJobs);
console.log(`${normalizedJobs.length} jobs imported successfully`);

// Phase 2: Duplicate Detection
console.log("\n--- Phase 2: Duplicate Detection ---");
const allJobs = await Job.find({}).lean();
const bulkOps = detectDuplicates(allJobs);

if (bulkOps.length > 0) {
  console.log(`Found ${bulkOps.length} duplicates. Updating database...`);
  await Job.bulkWrite(bulkOps);
  console.log("Duplicate references updated successfully.");
} else {
  console.log("No duplicates found.");
}

console.log("\nData import pipeline completed successfully!");
process.exit(0);

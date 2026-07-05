import path from "path";
import { fileURLToPath } from "url";
import xlsx from "xlsx";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import { normalizeJob } from "../utils/normalizeJob.js";

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

const processedJobs = [];
for (const rawJob of rawJobs) {
  const normalized = normalizeJob(rawJob);
  processedJobs.push(normalized);
}

console.log("First processed job preview:");
console.log(JSON.stringify(processedJobs[0], null, 2));

console.log("\nData cleaning successful! Next step is inserting these into MongoDB.");

process.exit(0);

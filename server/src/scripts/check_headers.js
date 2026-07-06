import path from "path";
import { fileURLToPath } from "url";
import xlsx from "xlsx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../../dataset/Jobs Dataset.xlsx");

const workbook = xlsx.readFile(filePath, { sheetRows: 5 });
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const jobs = xlsx.utils.sheet_to_json(worksheet);

console.log(JSON.stringify(Object.keys(jobs[0]), null, 2));

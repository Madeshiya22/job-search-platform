import multer from "multer";
import { PDFParse } from "pdf-parse";
import { GoogleGenAI } from "@google/genai";
import mongoose from "mongoose";
import Job from "../models/job.model.js";

// Setup multer for memory storage
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

export const analyzeResumeHandler = async (req, res) => {
  try {
    const { jobId } = req.body;
    const file = req.file;

    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ success: false, message: "Valid Job ID is required" });
    }

    if (!file) {
      return res.status(400).json({ success: false, message: "Resume PDF file is required" });
    }

    // 1. Fetch Job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const jobDescription = job.description;
    if (!jobDescription) {
      return res.status(400).json({ success: false, message: "Selected job has no description to analyze against" });
    }

    // 2. Parse PDF
    let pdfText = "";
    try {
      const parser = new PDFParse({ data: file.buffer });
      const result = await parser.getText();
      pdfText = result.text;
    } catch (error) {
      return res.status(400).json({ success: false, message: "Failed to parse PDF file. Ensure it is a valid text-based PDF." });
    }

    if (!pdfText || pdfText.trim().length === 0) {
      return res.status(400).json({ success: false, message: "Could not extract text from the PDF." });
    }

    // 3. Call Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ success: false, message: "Gemini API key is not configured on the server" });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are an expert technical recruiter. 
You will receive a Resume and a Job Description. 
Analyze the resume against the job.

Return ONLY valid JSON.
Never return markdown.
Never return explanation.

Schema:
{
  "matchScore": number (0-100),
  "strengths": [string],
  "missingSkills": [string],
  "missingQualifications": [string],
  "missingExperience": [string],
  "improvementSuggestions": [string],
  "summary": string (concise)
}

Job Description:
${jobDescription}

Resume:
${pdfText}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    // 4. Parse JSON
    let analysisResult;
    try {
      let rawResponse = response.text;
      // Safety cleanup in case Gemini still wraps in markdown despite instructions
      rawResponse = rawResponse.replace(/```json/gi, "").replace(/```/gi, "").trim();
      analysisResult = JSON.parse(rawResponse);
    } catch (error) {
      console.error("Failed to parse Gemini response:", response.text);
      return res.status(500).json({ success: false, message: "Failed to parse AI response. Please try again." });
    }

    res.status(200).json({
      success: true,
      data: analysisResult,
    });
  } catch (error) {
    console.error("Resume Analysis Error:", error);
    res.status(500).json({
      success: false,
      message: error.message === "Only PDF files are allowed" ? error.message : "Internal server error during analysis",
    });
  }
};

export const analyzeResume = [
  (req, res, next) => {
    const uploadSingle = upload.single("resume");
    uploadSingle(req, res, (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      next();
    });
  },
  analyzeResumeHandler
];

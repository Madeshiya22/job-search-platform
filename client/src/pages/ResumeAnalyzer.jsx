import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { MdCloudUpload, MdCheckCircle, MdWarning, MdError, MdAutoFixHigh } from "react-icons/md";
import toast from "react-hot-toast";

import { getJobs } from "../services/job.service";
import { analyzeResume } from "../services/resume.service";
import { ErrorState } from "../components/common/ErrorState";

const ResumeAnalyzer = () => {
  const [selectedJob, setSelectedJob] = useState("");
  const [file, setFile] = useState(null);

  // Fetch jobs for dropdown
  const { data: jobsData, isLoading: isLoadingJobs, isError: isErrorJobs } = useQuery({
    queryKey: ["jobs", "all"],
    queryFn: () => getJobs({ limit: 100 }), // Get up to 100 jobs for the dropdown
  });

  const analyzeMutation = useMutation({
    mutationFn: analyzeResume,
    onSuccess: () => {
      toast.success("Resume analyzed successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to analyze resume.");
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };

  const handleAnalyze = () => {
    if (!selectedJob) {
      toast.error("Please select a job description.");
      return;
    }
    if (!file) {
      toast.error("Please upload your resume.");
      return;
    }

    const formData = new FormData();
    formData.append("jobId", selectedJob);
    formData.append("resume", file);

    analyzeMutation.mutate(formData);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600 border-green-600 bg-green-50";
    if (score >= 70) return "text-yellow-600 border-yellow-600 bg-yellow-50";
    return "text-red-600 border-red-600 bg-red-50";
  };

  if (isErrorJobs) {
    return <ErrorState message="Failed to load jobs for analysis. Please try again later." />;
  }

  const result = analyzeMutation.data;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-2">
          <MdAutoFixHigh className="text-blue-600" />
          AI Resume Tailoring
        </h1>
        <p className="mt-2 text-slate-600 text-lg">
          Select a job and upload a resume to see how well they match.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Column */}
        <div className="col-span-1 lg:col-span-1 flex flex-col gap-6">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4">1. Select Job</h2>
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              disabled={isLoadingJobs || analyzeMutation.isPending}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">-- Choose a Job --</option>
              {jobsData?.data?.jobs?.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.title} at {job.company}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4">2. Upload Resume</h2>
            <div className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-6 transition-colors hover:border-blue-500 hover:bg-blue-50">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                disabled={analyzeMutation.isPending}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <MdCloudUpload className="text-slate-400 mb-2" size={48} />
              <p className="text-sm font-medium text-slate-700">
                {file ? file.name : "Drag & Drop or Click to Upload"}
              </p>
              <p className="text-xs text-slate-500 mt-1">Only PDF format supported</p>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={analyzeMutation.isPending || !selectedJob || !file}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-4 text-lg font-bold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {analyzeMutation.isPending ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Analyzing...
              </>
            ) : (
              <>
                <MdAutoFixHigh size={24} />
                Analyze Resume
              </>
            )}
          </button>
        </div>

        {/* Results Column */}
        <div className="col-span-1 lg:col-span-2">
          {analyzeMutation.isPending && (
            <div className="flex h-full flex-col items-center justify-center rounded-xl bg-white p-12 shadow-sm border border-slate-100 text-slate-500">
              <MdAutoFixHigh className="animate-pulse text-blue-500 mb-4" size={64} />
              <h2 className="text-xl font-bold">AI is analyzing the resume...</h2>
              <p className="mt-2 text-center max-w-sm">
                Extracting skills, verifying qualifications, and generating actionable feedback.
              </p>
            </div>
          )}

          {!analyzeMutation.isPending && !result && (
            <div className="flex h-full items-center justify-center rounded-xl bg-white p-12 shadow-sm border border-slate-100 text-slate-500">
              <p className="text-lg">Select a job and upload a resume to see the analysis.</p>
            </div>
          )}

          {!analyzeMutation.isPending && result && (
            <div className="rounded-xl bg-white shadow-sm border border-slate-100 overflow-hidden">
              {/* Score Header */}
              <div className={`flex flex-col md:flex-row items-center gap-6 p-8 border-b border-b-2 ${getScoreColor(result.matchScore)}`}>
                <div className="flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 shadow-sm bg-white border-current">
                  <span className="text-4xl font-extrabold">{result.matchScore}%</span>
                  <span className="text-sm font-semibold uppercase">Match</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-800">Executive Summary</h2>
                  <p className="mt-2 text-slate-700 text-lg leading-relaxed">{result.summary}</p>
                </div>
              </div>

              {/* Analysis Details */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Strengths */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
                    <MdCheckCircle className="text-green-500" size={24} />
                    Key Strengths
                  </h3>
                  <ul className="space-y-2">
                    {result.strengths?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                    {(!result.strengths || result.strengths.length === 0) && (
                      <p className="text-slate-500 italic">No particular strengths highlighted.</p>
                    )}
                  </ul>
                </div>

                {/* Missing Skills */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
                    <MdWarning className="text-yellow-500" size={24} />
                    Missing Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills?.map((skill, idx) => (
                      <span key={idx} className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                        {skill}
                      </span>
                    ))}
                    {(!result.missingSkills || result.missingSkills.length === 0) && (
                      <span className="text-sm text-green-600 font-medium">All required skills present!</span>
                    )}
                  </div>
                </div>

                {/* Missing Experience & Qualifications */}
                <div className="md:col-span-2">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
                    <MdError className="text-red-500" size={24} />
                    Missing Experience & Qualifications
                  </h3>
                  <ul className="space-y-2">
                    {result.missingExperience?.map((item, idx) => (
                      <li key={`exp-${idx}`} className="flex items-start gap-2 text-slate-700">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                    {result.missingQualifications?.map((item, idx) => (
                      <li key={`qual-${idx}`} className="flex items-start gap-2 text-slate-700">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                    {(!result.missingExperience?.length && !result.missingQualifications?.length) && (
                      <p className="text-slate-500 italic">No missing experience or qualifications flagged.</p>
                    )}
                  </ul>
                </div>

                {/* Improvement Suggestions */}
                <div className="md:col-span-2 rounded-lg bg-blue-50 p-6 border border-blue-100">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">How to Improve</h3>
                  <ul className="space-y-2">
                    {result.improvementSuggestions?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-blue-800">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;

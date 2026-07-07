import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  MdLocationOn, 
  MdWork, 
  MdAccessTime, 
  MdBusinessCenter, 
  MdLayers, 
  MdDescription,
  MdAttachMoney,
  MdSend
} from "react-icons/md";
import { getJobById } from "../services/job.service";
import { DetailsSkeleton } from "../components/common/Skeletons";
import { ErrorState } from "../components/common/ErrorState";

const JobDetails = () => {
  const { id } = useParams();
  const [showFullDesc, setShowFullDesc] = useState(false);

  const { data: job, isLoading, isError } = useQuery({
    queryKey: ["job", id],
    queryFn: () => getJobById(id),
  });

  if (isLoading) {
    return <DetailsSkeleton />;
  }

  if (isError || !job) {
    return <ErrorState message="Could not load job details. The job may have been removed." />;
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow-sm border border-slate-100">
      <h1 className="mb-2 text-4xl font-extrabold text-slate-800">
        {job.title}
      </h1>

      <p className="text-xl font-medium text-blue-600">
        {job.company}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-4 border border-slate-100">
          <MdLocationOn className="mt-0.5 text-blue-500" size={24} />
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase">Location</h3>
            <p className="mt-1 font-medium text-slate-800">{job.location}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-4 border border-slate-100">
          <MdWork className="mt-0.5 text-blue-500" size={24} />
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase">Work Mode</h3>
            <p className="mt-1 font-medium text-slate-800">{job.workMode}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-4 border border-slate-100">
          <MdAccessTime className="mt-0.5 text-blue-500" size={24} />
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase">Employment</h3>
            <p className="mt-1 font-medium text-slate-800">{job.employmentType}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-4 border border-slate-100">
          <MdBusinessCenter className="mt-0.5 text-blue-500" size={24} />
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase">Experience</h3>
            <p className="mt-1 font-medium text-slate-800">{job.experienceLevel}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-4 border border-slate-100">
          <MdLayers className="mt-0.5 text-blue-500" size={24} />
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase">Department</h3>
            <p className="mt-1 font-medium text-slate-800">{job.department}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-4 border border-slate-100">
          <MdAttachMoney className="mt-0.5 text-blue-500" size={24} />
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase">Salary</h3>
            <p className="mt-1 font-medium text-slate-800">{job.salary?.raw || "Not Available"}</p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-800">
          <MdDescription className="text-blue-500" />
          Job Description
        </h2>

        <div className="whitespace-pre-wrap rounded-lg bg-slate-50 p-6 text-slate-700 leading-relaxed border border-slate-100">
          {showFullDesc || !job.description || job.description.length <= 500
            ? job.description
            : `${job.description.substring(0, 500)}...`}
            
          {job.description && job.description.length > 500 && (
            <button
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="mt-4 block font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              {showFullDesc ? "View Less" : "Read Full Description"}
            </button>
          )}
        </div>
      </div>

      <div className="mt-10">
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
        >
          <MdSend size={20} />
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobDetails;
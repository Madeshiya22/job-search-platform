import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
    <div className="rounded-xl bg-white p-8 shadow">
      <h1 className="mb-2 text-3xl font-bold">
        {job.title}
      </h1>

      <p className="text-lg text-gray-600">
        {job.company}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="font-semibold">Location</h3>
          <p>{job.location}</p>
        </div>

        <div>
          <h3 className="font-semibold">Work Mode</h3>
          <p>{job.workMode}</p>
        </div>

        <div>
          <h3 className="font-semibold">
            Employment Type
          </h3>
          <p>{job.employmentType}</p>
        </div>

        <div>
          <h3 className="font-semibold">
            Experience
          </h3>
          <p>{job.experienceLevel}</p>
        </div>

        <div>
          <h3 className="font-semibold">
            Department
          </h3>
          <p>{job.department}</p>
        </div>

        <div>
          <h3 className="font-semibold">
            Apply Type
          </h3>
          <p>{job.applyType}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-xl font-bold">
          Salary
        </h2>

        <p>{job.salary?.raw || "Not Available"}</p>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-xl font-bold">
          Job Description
        </h2>

        <div className="whitespace-pre-wrap rounded bg-gray-50 p-5">
          {showFullDesc || !job.description || job.description.length <= 500
            ? job.description
            : `${job.description.substring(0, 500)}...`}
            
          {job.description && job.description.length > 500 && (
            <button
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="mt-4 block font-semibold text-blue-600 hover:underline"
            >
              {showFullDesc ? "[Show Less]" : "[Show More]"}
            </button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobDetails;
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import JobFilters from "../components/jobs/JobFilters";
import JobTable from "../components/jobs/JobTable";

import { getJobs } from "../services/job.service";

const Jobs = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    company: "",
    location: "",
    workMode: "",
    employmentType: "",
    sortBy: "postedDate",
    order: "desc",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => getJobs(filters),
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="space-y-6">
      <JobFilters
        filters={filters}
        setFilters={setFilters}
      />

      <JobTable
        jobs={data.data.jobs}
        pagination={data.data.pagination}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default Jobs;
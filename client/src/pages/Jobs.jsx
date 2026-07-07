import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import JobFilters from "../components/jobs/JobFilters";
import JobTable from "../components/jobs/JobTable";

import { getJobs } from "../services/job.service";
import { TableSkeleton } from "../components/common/Skeletons";
import { ErrorState } from "../components/common/ErrorState";
import { EmptyState } from "../components/common/EmptyState";

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

  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => getJobs(filters),
  });

  return (
    <div className="space-y-6">
      <JobFilters
        filters={filters}
        setFilters={setFilters}
      />

      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <ErrorState message="Failed to load jobs. Please try again." />
      ) : data.data.jobs.length === 0 ? (
        <EmptyState title="No Jobs Found" message="Try adjusting your filters to find what you're looking for." />
      ) : (
        <JobTable
          jobs={data.data.jobs}
          pagination={data.data.pagination}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </div>
  );
};

export default Jobs;
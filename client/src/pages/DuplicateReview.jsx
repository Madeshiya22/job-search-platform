import { useQuery } from "@tanstack/react-query";
import DuplicateTable from "../components/duplicates/DuplicateTable";
import { getDuplicates } from "../services/job.service";
import { TableSkeleton } from "../components/common/Skeletons";
import { ErrorState } from "../components/common/ErrorState";
import { EmptyState } from "../components/common/EmptyState";

const DuplicateReview = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["duplicates"],
    queryFn: getDuplicates,
  });

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Duplicate Review
      </h1>

      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <ErrorState message="Failed to load duplicates. Please try again." />
      ) : data?.data?.length === 0 ? (
        <EmptyState title="All Clear!" message="No duplicate jobs found in the system." />
      ) : (
        <DuplicateTable jobs={data?.data} />
      )}
    </div>
  );
};

export default DuplicateReview;
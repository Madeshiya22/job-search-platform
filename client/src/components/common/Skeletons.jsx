export const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse space-y-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-32 rounded-xl bg-gray-200"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="h-80 rounded-xl bg-gray-200"></div>
        <div className="h-80 rounded-xl bg-gray-200"></div>
        <div className="col-span-1 h-80 rounded-xl bg-gray-200 md:col-span-2"></div>
      </div>
    </div>
  );
};

export const TableSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl bg-white p-5 shadow">
      <div className="mb-4 h-10 w-full rounded bg-gray-200"></div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-16 w-full rounded bg-gray-100"></div>
        ))}
      </div>
    </div>
  );
};

export const DetailsSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl bg-white p-8 shadow">
      <div className="mb-4 h-8 w-2/3 rounded bg-gray-200"></div>
      <div className="mb-8 h-6 w-1/3 rounded bg-gray-200"></div>
      
      <div className="grid grid-cols-2 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            <div className="h-6 w-3/4 rounded bg-gray-200"></div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 space-y-4">
        <div className="h-6 w-1/4 rounded bg-gray-200"></div>
        <div className="h-32 w-full rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

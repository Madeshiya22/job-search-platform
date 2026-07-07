export const EmptyState = ({ title = "No Results Found", message = "We couldn't find anything matching your criteria." }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50 p-10 text-center shadow-sm">
      <div className="mb-4 text-5xl opacity-50">📭</div>
      <h3 className="mb-2 text-xl font-bold text-gray-700">{title}</h3>
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

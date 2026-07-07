export const ErrorState = ({ message = "Something went wrong. Please try again later." }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-red-50 p-10 text-center">
      <div className="mb-4 text-4xl text-red-500">⚠️</div>
      <h3 className="mb-2 text-xl font-bold text-red-700">Error Loading Data</h3>
      <p className="text-red-600">{message}</p>
    </div>
  );
};

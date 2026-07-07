const Pagination = ({
  pagination,
  filters,
  setFilters,
}) => {
  const { page, totalPages } = pagination;

  return (
    <div className="flex items-center justify-between p-5">
      <button
        disabled={page === 1}
        onClick={() =>
          setFilters({
            ...filters,
            page: page - 1,
          })
        }
        className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
      >
        Previous
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() =>
          setFilters({
            ...filters,
            page: page + 1,
          })
        }
        className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

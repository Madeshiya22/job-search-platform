import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const JobTable = ({
  jobs,
  pagination,
  filters,
  setFilters,
}) => {
  return (
    <div className="rounded-xl bg-white shadow">
      <table className="w-full">
        <thead className="border-b bg-gray-100">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Company</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Work Mode</th>
            <th className="p-4 text-left">Employment</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr
              key={job._id}
              className="border-b hover:bg-gray-50"
            >
              <td className="p-4">{job.title}</td>

              <td className="p-4">{job.company}</td>

              <td className="p-4">{job.location}</td>

              <td className="p-4">{job.workMode}</td>

              <td className="p-4">
                {job.employmentType}
              </td>

              <td className="p-4">
                <Link
                  to={`/jobs/${job._id}`}
                  className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        pagination={pagination}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default JobTable;
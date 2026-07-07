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
      <div className="overflow-x-auto">
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
              className="border-b transition-colors duration-200 hover:bg-blue-50/50"
            >
              <td className="p-4">{job.title}</td>

              <td className="p-4">{job.company}</td>

              <td className="p-4">{job.location}</td>

              <td className="p-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                  job.workMode?.toLowerCase() === 'remote' ? 'bg-purple-100 text-purple-800' :
                  job.workMode?.toLowerCase() === 'hybrid' ? 'bg-orange-100 text-orange-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {job.workMode}
                </span>
              </td>

              <td className="p-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                  {job.employmentType}
                </span>
              </td>

              <td className="p-4">
                <Link
                  to={`/jobs/${job._id}`}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <Pagination
        pagination={pagination}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default JobTable;
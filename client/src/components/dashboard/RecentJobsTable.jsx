import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";

const RecentJobsTable = ({ jobs, isLoading }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h3 className="text-lg font-bold text-gray-800">Recent Jobs Added</h3>
        <Link to="/jobs" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
          View All
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Job Title</th>
              <th className="px-6 py-4 font-semibold">Company</th>
              <th className="px-6 py-4 font-semibold">Location</th>
              <th className="px-6 py-4 font-semibold">Posted Date</th>
              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  Loading recent jobs...
                </td>
              </tr>
            ) : jobs?.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  No jobs found.
                </td>
              </tr>
            ) : (
              jobs?.map((job) => (
                <tr key={job._id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{job.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{job.workMode} • {job.employmentType}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{job.company}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {job.location}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/jobs/${job._id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                    >
                      Details <FiExternalLink />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentJobsTable;

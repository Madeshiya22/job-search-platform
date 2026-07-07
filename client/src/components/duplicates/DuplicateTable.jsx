import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateDuplicateStatus } from "../../services/job.service";

const DuplicateTable = ({ jobs }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }) =>
      updateDuplicateStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["duplicates"],
      });
      toast.success("Duplicate status updated!");
    },
    onError: () => {
      toast.error("Failed to update status.");
    }
  });

  return (
    <div className="rounded-xl bg-white shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">
              Title
            </th>

            <th className="p-4 text-left">
              Company
            </th>

            <th className="p-4 text-left">
              Location
            </th>

            <th className="p-4 text-left">
              Type
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {jobs?.map((job) => (
            <tr
              key={job._id}
              className="border-b transition-colors duration-200 hover:bg-blue-50/50"
            >
              <td className="p-4">
                {job.title}
              </td>

              <td className="p-4">
                {job.company}
              </td>

              <td className="p-4">
                {job.location}
              </td>

              <td className="p-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                  job.duplicateType === 'exact' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {job.duplicateType || "near"}
                </span>
              </td>

              <td className="p-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                  job.duplicateStatus === 'confirmed' ? 'bg-green-100 text-green-800' :
                  job.duplicateStatus === 'ignored' ? 'bg-gray-100 text-gray-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {job.duplicateStatus}
                </span>
              </td>

              <td className="space-x-2 p-4 whitespace-nowrap">
                <button
                  onClick={() =>
                    mutation.mutate({
                      id: job._id,
                      status: "confirmed",
                    })
                  }
                  className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-green-700 hover:shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-95"
                >
                  Confirm
                </button>

                <button
                  onClick={() =>
                    mutation.mutate({
                      id: job._id,
                      status: "ignored",
                    })
                  }
                  className="rounded-lg bg-slate-500 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-600 hover:shadow focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 active:scale-95"
                >
                  Ignore
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default DuplicateTable;
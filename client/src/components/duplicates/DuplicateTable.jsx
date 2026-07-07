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
              className="border-b"
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
                {job.duplicateType}
              </td>

              <td className="p-4">
                {job.duplicateStatus}
              </td>

              <td className="space-x-2 p-4">
                <button
                  onClick={() =>
                    mutation.mutate({
                      id: job._id,
                      status: "confirmed",
                    })
                  }
                  className="rounded bg-green-600 px-3 py-2 text-white"
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
                  className="rounded bg-red-600 px-3 py-2 text-white"
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
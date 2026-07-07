import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WorkModeChart = ({ data }) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h2 className="mb-5 text-lg font-semibold">
        Work Mode
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="_id"
            outerRadius={100}
            fill="#8b5cf6"
          />

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkModeChart;

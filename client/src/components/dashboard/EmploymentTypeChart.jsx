import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
} from "recharts";

const EmploymentTypeChart = ({ data }) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h2 className="mb-5 text-lg font-semibold">
        Employment Type
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="_id" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="count" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmploymentTypeChart;

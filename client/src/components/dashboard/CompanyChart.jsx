import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
} from "recharts";

const CompanyChart = ({ data }) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h2 className="mb-5 text-lg font-semibold">
        Jobs by Company
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="_id" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompanyChart;

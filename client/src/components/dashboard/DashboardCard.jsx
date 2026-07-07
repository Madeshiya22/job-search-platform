const DashboardCard = ({
  title,
  value,
}) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h3 className="text-gray-500">
        {title}
      </h3>

      <h1 className="mt-3 text-4xl font-bold">
        {value}
      </h1>
    </div>
  );
};

export default DashboardCard;

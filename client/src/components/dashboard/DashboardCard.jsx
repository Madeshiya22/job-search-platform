const DashboardCard = ({
  title,
  value,
  icon
}) => {
  return (
    <div className="rounded-xl bg-gradient-to-br from-white to-blue-50/50 p-6 shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
          {title}
        </h3>
        {icon && <div className="text-blue-500 bg-blue-100/50 p-2 rounded-lg">{icon}</div>}
      </div>

      <h1 className="mt-4 text-3xl font-bold text-slate-800">
        {value}
      </h1>
    </div>
  );
};

export default DashboardCard;

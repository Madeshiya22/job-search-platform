import { FiBriefcase, FiHome, FiMapPin, FiAlertCircle } from "react-icons/fi";

const DashboardCards = ({ stats }) => {
  const cards = [
    {
      title: "Total Jobs",
      value: stats?.totalJobs?.toLocaleString() || 0,
      icon: <FiBriefcase className="w-6 h-6 text-blue-500" />,
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      title: "Total Companies",
      value: stats?.totalCompanies?.toLocaleString() || 0,
      icon: <FiHome className="w-6 h-6 text-indigo-500" />,
      bg: "bg-indigo-50",
      border: "border-indigo-100",
    },
    {
      title: "Remote Jobs",
      value: stats?.remoteJobs?.toLocaleString() || 0,
      icon: <FiMapPin className="w-6 h-6 text-emerald-500" />,
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      title: "Duplicate Jobs",
      value: stats?.duplicateJobs?.toLocaleString() || 0,
      icon: <FiAlertCircle className="w-6 h-6 text-rose-500" />,
      bg: "bg-rose-50",
      border: "border-rose-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`p-6 rounded-2xl bg-white border ${card.border} shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-between`}
        >
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{card.title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.bg}`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
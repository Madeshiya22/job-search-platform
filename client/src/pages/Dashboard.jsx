import { useQuery } from "@tanstack/react-query";

import DashboardCard from "../components/dashboard/DashboardCard";
import CompanyChart from "../components/dashboard/CompanyChart";
import WorkModeChart from "../components/dashboard/WorkModeChart";
import EmploymentTypeChart from "../components/dashboard/EmploymentTypeChart";

import { getDashboard } from "../services/dashboard.service";

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const stats = data.cards;

  return (
    <div>
      <div className="grid grid-cols-3 gap-5">
        <DashboardCard
          title="Total Jobs"
          value={stats.totalJobs}
        />

        <DashboardCard
          title="Companies"
          value={stats.totalCompanies}
        />

        <DashboardCard
          title="Remote Jobs"
          value={stats.remoteJobs}
        />

        <DashboardCard
          title="Duplicate Jobs"
          value={stats.duplicateJobs}
        />

        <DashboardCard
          title="Locations"
          value={stats.totalLocations}
        />

        <DashboardCard
          title="Full Time"
          value={stats.fullTimeJobs}
        />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">
        <CompanyChart
          data={data.charts.jobsByCompany}
        />

        <WorkModeChart
          data={data.charts.jobsByWorkMode}
        />

        <div className="col-span-2">
          <EmploymentTypeChart
            data={data.charts.jobsByEmploymentType}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;